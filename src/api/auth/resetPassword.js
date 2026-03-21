import axios from "../axiosInstance";

export const resetPassword = async (code) => {
  const response = await axios.post("/auth/password/reset", code);
  return response.data;
};
