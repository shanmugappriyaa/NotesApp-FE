import axios from "axios";

export const base_url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/"
    : "https://shan-notes-mgmt.onrender.com";

export const headerConfig = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

const AxiosService = axios.create({
  baseURL: base_url,
  headerConfig
});

AxiosService.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default AxiosService;
