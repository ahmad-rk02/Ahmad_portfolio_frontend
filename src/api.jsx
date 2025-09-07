import axios from "axios";
  console.log("Base URL:", import.meta.env.VITE_API_BASE);
const API = axios.create({

  baseURL: import.meta.env.VITE_API_BASE

});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
