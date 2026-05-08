import api from "./api"

// get all project
export const getAllProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

// create project
export const createProject = async (projectData) => {
  const response = await api.post("/projects", projectData);
  return response.data;
};

// update project
export const updateProject = async (id, projectData) => {
  const response = await api.put(`/projects/${id}`, projectData);
  return response.data;
}

// delete images
export const deleteProjectImage = async (id) => {
  const response = await api.delete(`/projects/project-images/${id}`);
  return response.data;
};

// delete project
export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};