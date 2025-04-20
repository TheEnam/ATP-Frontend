import axios from "../axiosInstance";

export const verifyEmail = async (token) => {
  const response = await axios.post("/auth/email/verify");
  return response.data;
};
export const resendVerificationEmail = async (email) => {
  const response = await axios.post("/auth/resend-verification-email", { email });
  return response.data;
};