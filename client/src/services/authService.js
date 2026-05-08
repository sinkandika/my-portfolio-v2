import api from "./api"

// register admin
export const registerAdmin = async (adminData) => {
  const response = await api.post("/auth/register", adminData); // auth/register must match with backend (app.js)
  return response.data;
};

// login admin
export const loginAdmin = async (adminData) => {
  const response = await api.post("/auth/login", adminData); // auth/login must match with backend
  return response.data;
};

