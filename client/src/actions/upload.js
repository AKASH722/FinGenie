'use server';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

export async function uploadToS3(formData) {
  const file = formData.get('file');
  if (!file) throw new Error('No file received');

  const buffer = Buffer.from(await file.arrayBuffer());

  const fileName = `uploads/${Date.now()}-${randomUUID()}-${file.name}`;
  const uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: file.type,
  };

  await s3.send(new PutObjectCommand(uploadParams));

  return `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${fileName}`;
}
