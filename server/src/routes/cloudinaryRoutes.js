import express from "express";

import verifyToken from "../middleware/verifyToken.js";
import upload from "../middleware/upload.js";

import { uploadProjectImages } from "../controllers/cloudinaryController.js";

const router = express.Router();

router.post(
  "/upload",
  verifyToken,
  upload.array("images", 10),
  uploadProjectImages
);

export default router;