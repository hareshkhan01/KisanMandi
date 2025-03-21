import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";

const cloudName: string = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; // Replace with actual Cloudinary cloud name
const uploadPreset: string = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; // Replace with your Cloudinary upload preset if applicable

const ImageUploader: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    console.log(cloudName);

    setUploading(true);
    const uploadedImages: string[] = [];

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset); // Required for unsigned uploads

      try {
        const response: AxiosResponse<{ secure_url: string }> =
          await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

        uploadedImages.push(response.data.secure_url); // Save the image URL
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    console.log(uploadedImages)
    setUploadedUrls(uploadedImages);
    console.log(uploadedUrls);
    setUploading(false);
  };

  return (
    <div className="p-4">
      <input type="file" multiple onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {uploadedUrls.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Uploaded Images:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {uploadedUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Uploaded ${index + 1}`}
                className="w-32 h-32 object-cover rounded"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
