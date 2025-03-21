'use server';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadToS3(formData) {
  const file = formData.get('file');
  if (!file) throw new Error('No file received');

  const buffer = Buffer.from(await file.arrayBuffer());

  const fileName = `uploads/${Date.now()}-${randomUUID()}-${file.name}`;
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: file.type,
  };

  await s3.send(new PutObjectCommand(uploadParams));

  const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  console.log('Uploaded URL:', url);
  return url;
}
