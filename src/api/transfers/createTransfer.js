import axios from "../axiosInstance";

export const createTransfer = async (formData) => {
  const response = await axios.post("/transfer", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};
