import axios from "../axiosInstance";

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post("/auth/password/forgot", { email });
    return response.data;
  } catch (error) {
    console.error("Error sending password reset link:", error);
    throw error;
  }
};