import axios from "../axiosInstance";

export const updateThanksgiving = async (id, updatedData) => {
  if (!id) throw new Error("ID is required");
  return await axios.put(`/thanksgiving/${id}`, updatedData);
};
