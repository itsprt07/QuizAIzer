// src/api.js
import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://quizaizer-backend.onrender.com/api"
    : "http://localhost:5000/api";

const API = axios.create({ baseURL });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
