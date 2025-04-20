import axios from "../axiosInstance";

export const forgotPassword = async (data) => {
  const response = await axios.post("/auth/password/forgot", data);
  return response.data;
};
