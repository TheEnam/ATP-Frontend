import axios from "../axiosInstance";

export const verifyEmail = async (code) => {
  try {
    console.log("Verifying email with token:", code);
    const response = await axios.post("/auth/email/verify", { code });
    return response.data;
  } catch (error) {
    console.error("Verification API error:", error.response?.data || error.message);
    throw error;
  }
};

export const resendVerificationEmail = async (email) => {
  const response = await axios.post("/auth/resend-verification-email", { email });
  return response.data;
};