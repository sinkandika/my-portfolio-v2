const pool = require("../config/db");
const { 
  getProjectsService,
  postProjectService,
  updateProjectService,
  deleteProjectService,
  deleteProjectImageService,
} = require("../services/projectServices");


// get all projects (request/response)
const getAllProjects = async (req, res) => {
  try {
    const projects = await getProjectsService();

    res.status(200).json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// post projects (request/response)
const postProject = async (req, res) => {
  try {
    const project = await postProjectService(req.body);

    res.status(201).json({
      message: "Project created successfully",
      project: project,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// update/put project (request/response)
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await updateProjectService(
      id,
      req.body
    );

    res.status(200).json({
      message: "Project updated successfully",
      project: project,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// delete image (request/response)
const deleteProjectImage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteProjectImageService(id);

    if (!deleted) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json({ message: "Image Deleted", data: deleted });
    console.log("Deleting image id:", id);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete project (request/response)
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteProjectService(id);

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "Project not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getAllProjects,
  postProject,
  updateProject,
  deleteProject,
  deleteProjectImage
};
