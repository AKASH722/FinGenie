'use client';
import { useState } from 'react';
import { uploadToS3 } from '@/actions/upload'

export default function Home() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const url = await uploadToS3(formData);
      console.log('Uploaded URL:', url);
      alert(`Image uploaded successfully: ${url}`);
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed');
    }
  };

  return (
    <div className="p-10">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleUpload}>
        Upload to S3
      </button>
    </div>
  );
}

