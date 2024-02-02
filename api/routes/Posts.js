import express from 'express';
import pkg from '@prisma/client';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import crypto from 'crypto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { authMiddleware } from '../authMiddleware.js';

const { PrismaClient, Prisma } = pkg;

const router = express.Router();

const prisma = new PrismaClient();

dotenv.config();

const randomImgName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.ACCESS_SECRET_KEY_ID;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },

  region: bucketRegion,
});

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  const posts = await prisma.post.findMany();

  for (const post of posts) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: post.image,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    post.imageUrl = url;
  }

  res.json(posts);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const post = await prisma.post
    .findUnique({
      where: {
        id: String(req.params.id),
      },
    })
    .catch((err) => res.status(404).json({ msg: err }));

  const params = {
    Bucket: bucketName,
    Key: post.image,
  };
  const command = new DeleteObjectCommand(params);
  await s3.send(command);

  await prisma.post
    .delete({
      where: {
        id: String(req.params.id),
      },
    })
    .then(() => {
      console.log('Post Deleted');
    })
    .catch((err) => console.log(err));

  res.send(post);
});

router.get('/:id', async (req, res) => {
  const post = await prisma.post
    .findUnique({
      where: {
        id: String(req.params.id),
      },
    })
    .catch((err) => res.status(400).json({ msg: err }));

  const getObjectParams = {
    Bucket: bucketName,
    Key: post.image,
  };
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  post.imageUrl = url;

  return res.status(200).json(post);
});

router.get('/user/:id', authMiddleware, async (req, res) => {
  const posts = await prisma.post
    .findMany({
      where: {
        authorId: String(req.params.id),
      },
    })
    .catch((err) => res.status(400).json({ msg: err }));

  for (const post of posts) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: post.image,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    post.imageUrl = url;
  }

  return res.status(200).json(posts);
});

router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) return res.json('No file exists!');

  const imageName = randomImgName();

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);

  try {
    const result = await s3.send(command);
  } catch (err) {
    console.log(err);
  }
  const { title, content, authorId, userPosted } = req.body;
  const post = await prisma.post
    .create({
      data: {
        title,
        content,
        authorId,
        image: imageName,
        userPosted,
      },
    })
    .catch((err) => {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          res.status(403).json({
            msg: `A duplicate ${err.meta.target} was entered, please enter a new one.`,
          });
        }
        if (err.code === 'P2014') {
          res.status(400).json({
            msg: `Invalid id: ${err.meta.target}.`,
          });
        }
        if (err.code === 'P2003') {
          res.status(400).json({
            msg: `Invalid input data:  ${err.meta.target}.`,
          });
        } else {
          res.status(500).json({
            msg: `Something went wrong ${err.meta.target}, please try again.`,
          });
        }
      }
    });
  return res.status(200).json(post);
});

export { router };
