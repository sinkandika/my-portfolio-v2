const express = require("express"); 
const pool = require("../config/db");
const verifyToken = require("../middleware/verifyToken");
const { 
  getAllProjects, 
  postProject, 
  updateProject,
  deleteProject,
  deleteProjectImage,
} = require("../controllers/projectController");

const router = express.Router();

// GET view all project (endpoint)
router.get("/", getAllProjects);

// POST create new project (endpoint)
router.post("/", verifyToken, postProject);

// PUT update project (endpoint)
router.put("/:id", verifyToken, updateProject);

// DELETE image (endpoint)
router.delete('/project-images/:id', verifyToken, deleteProjectImage);

// DELETE project (endpoint)
router.delete("/:id", verifyToken, deleteProject);

module.exports = router;