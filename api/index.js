import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import crypto from 'crypto';
import pkg from '@prisma/client';
import { authMiddleware } from './authMiddleware.js';
import * as dotenv from 'dotenv';
import { router as userRoute } from './routes/User.js';
import { router as postRoute } from './routes/Posts.js';
const { PrismaClient } = pkg;
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
