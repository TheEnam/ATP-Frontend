import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    else {
      delete config.headers.Authorization;
    }
    return config;
  });
  
export default axiosInstance;
