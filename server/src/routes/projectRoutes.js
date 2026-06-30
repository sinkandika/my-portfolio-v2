import express from "express";

import verifyToken from "../middleware/verifyToken.js";

import {
  getAllProjects,
  postProject,
  updateProject,
  deleteProject,
  deleteProjectImage,
} from "../controllers/projectController.js";

const router = express.Router();

// GET all projects
router.get("/", getAllProjects);

// POST new project
router.post("/", verifyToken, postProject);

// PUT project
router.put("/:id", verifyToken, updateProject);

// DELETE project image
router.delete("/project-images/:id", verifyToken, deleteProjectImage);

// DELETE project
router.delete("/:id", verifyToken, deleteProject);

export default router;