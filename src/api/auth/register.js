import axios from "../axiosInstance";

export const register = async (data) => {
  const response = await axios.post("/auth/register", data);
  return response.data;
};
