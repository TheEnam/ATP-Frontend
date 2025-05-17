import axios from "../axiosInstance";

const token = localStorage.getItem("token") || sessionStorage.getItem("token");
if (!token) {
  throw new Error("No token found. Please log in.");
}

export const createTransfer = async (formData) => {
  const response = await axios.post("/transfer", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
