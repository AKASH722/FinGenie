import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';


const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const fileName = `uploads/${Date.now()}-${file.name}`;

    const uploadParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    // const url = `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${fileName}`;
    const url = `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${uploadParams.Key}`;

    console.log('File uploaded successfully:', url);

    return NextResponse.json({ url });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

