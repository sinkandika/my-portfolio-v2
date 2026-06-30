import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

const uploadImages = async (files) => {
  if (!files || files.length === 0) {
    return [];
  }

  const uploadedUrls = [];

  for (const file of files) {
    const secureUrl = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "portfolio-v2",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });

    uploadedUrls.push(secureUrl);
  }

  return uploadedUrls;
};

export { uploadImages };