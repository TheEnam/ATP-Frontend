import axios from "../axiosInstance";

export const login = async (data) => {
    const response = await axios.post("/auth/login", {
      email: data.email,
      password: data.password
    });
    return response.data;
  };
