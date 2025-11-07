import axios from "axios";
//console.log("API Base URL:", process.env.REACT_APP_API_URL); Used for debugging

// Set backend base URL 
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, 
});

// Interceptor to attach JWT token to every request, if user is logged in
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



// ---------- AUTH ROUTES ----------
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);

// ---------- PAYMENT ROUTES ----------
export const submitPayment = (data) => api.post("/payments/submit", data);

export default api;
