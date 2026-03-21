import axios from "../axiosInstance"; 

export const logout = async () => {
  try {
    const response = await axios.post("/auth/logout", {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
        });
        return response;
      } catch (error) {
        throw error;
      }
    };