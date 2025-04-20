import axios from "../axiosInstance";

export const resetPassword = async (data) => {
  const response = await axios.post("/auth/password/reset", data);
  return response.data;
};
