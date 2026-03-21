import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://atp-backend-4578.onrender.com' ,
  // baseURL: process.env.NODE_ENV === "development"
  //   ? ""
  //   : process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     else {
//       delete config.headers.Authorization;
//     }
//     return config;
//   });
  
export default axiosInstance;
