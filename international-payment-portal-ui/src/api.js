import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/",
  withCredentials: false // we use Authorization header with JWT
});

export default api;