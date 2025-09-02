// import axios from "axios";
// const base = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
// const API = axios.create({ baseURL: base });
// API.interceptors.request.use(req => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });
// export default API;
import axios from "axios";

const base = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const API = axios.create({
  baseURL: base,
  // optionally add timeout: 10000,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
