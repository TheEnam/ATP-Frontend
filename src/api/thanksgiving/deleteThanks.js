import axios from '../axiosInstance';

export const deleteThanksgiving = async (id) => {
  if (!id) throw new Error("ID is required for deletion");
  return await axios.delete(`/thanksgiving/${id}`);
};
