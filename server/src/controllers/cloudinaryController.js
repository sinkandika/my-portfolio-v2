import { uploadImages } from "../services/cloudinaryService.js";

const uploadProjectImages = async (req, res) => {
  try {
    const imageUrls = await uploadImages(req.files);

    res.status(200).json({
      message: "Images uploaded successfully.",
      images: imageUrls,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Image upload failed.",
    });
  }
};

export { uploadProjectImages };