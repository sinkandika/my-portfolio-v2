import axios from "axios";

// api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// token rule
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;