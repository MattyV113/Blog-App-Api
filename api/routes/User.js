import express from 'express';
import pkg from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
const { sign } = jwt;
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { authMiddleware } from '../authMiddleware.js';
dotenv.config();
const { PrismaClient, Prisma } = pkg;

const prisma = new PrismaClient();

const storage = multer.memoryStorage();
const upload = multer({ storage });

console.log();
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

const router = express.Router();

router.use(cookieParser());

router.post('/signup', upload.single('profilePicture'), async (req, res) => {
  const file = req.file;
  console.log(file);
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
    console.log(result);
  } catch (err) {
    console.log(err);
  }
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user
    .create({
      data: {
        username,
        email,
        password: hashedPassword,
        profilePicture: imageName,
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
        console.log(err);
      }
    });

  return res.status(200).json(user);
});

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});

router.put(
  '/editprofile/:id',
  upload.single('profilePicture'),
  async (req, res) => {
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
      console.log(result);
    } catch (err) {
      console.log(err);
    }

    const { username, email } = req.body;
    const user = await prisma.user
      .update({
        where: {
          id: String(req.params.id),
        },
        data: {
          username,
          email,
          profilePicture: imageName,
        },
      })
      .catch((err) => console.log(err));
    console.log(user);
    return res.status(200).json(user);
  }
);

router.get('/:id', authMiddleware, async (req, res) => {
  const user = await prisma.user
    .findUnique({
      where: {
        id: String(req.params.id),
      },
    })
    .catch((err) => res.status(400).json({ msg: err }));

  const getObjectParams = {
    Bucket: bucketName,
    Key: user.profilePicture,
  };
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  user.imageUrl = url;
  console.log(user);
  return res.status(200).json(user);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user
    .findUnique({
      where: {
        username,
      },
    })
    .catch((err) => {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
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
        console.log(err);
      }
    });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = sign({ username }, process.env.MY_JWT_KEY, {
      expiresIn: '1hr',
    });

    res.cookie('token', token, {});
    user.token = token;

    res.status(200).json(user);
  } else {
    res.status(400).send('Invalid Credentials');
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const link = `https://blog-app-production-0df7.up.railway.app/reset-password/${user.id}`;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
     host: "https://blog-app-production-0df7.up.railway.app", // smtp international
     secure: true, // force port 465
     // default port
    auth: {
      type: 'OAuth2',
      user: user.email,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });
  transporter.verify((err, success) => {
    err
      ? console.log(err)
      : console.log(`=== Server is ready to take messages: ${success} ===`);
  });

  let mailOptions = {
    from: 'mvinesdev@gmail.com',
    to: user.email,
    subject: `Reset Password for TechNext Login`,
    text: `Hello,
      Here is your password reset link: ${link}`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      res.json({
        status: 'fail',
      });
    } else {
      console.log('== Message Sent ==');
      res.json({
        status: 'success',
      });
    }
  });
});

router.put('/reset-password/:id', async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user
    .update({
      where: {
        id: String(req.params.id),
      },
      data: {
        password: hashedPassword,
      },
    })
    .catch((err) => {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
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
        console.log(err);
      }
    });

  res.status(200).json(user);
});

export { router };
