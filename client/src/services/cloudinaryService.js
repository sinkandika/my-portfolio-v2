import axios from "axios";

export const uploadImagesToCloudinary = async (files) => {
  const uploadedUrls = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      "my_portfolio_v2"
    );

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dn4ptq6kb/image/upload",
      formData
    );

    uploadedUrls.push(response.data.secure_url);
  }

  return uploadedUrls;
};