import axios from "../axiosInstance";

export const forgotPassword = async (email) => {
  const response = await axios.post("/auth/password/forgot", { email });
  return response.data;
};
