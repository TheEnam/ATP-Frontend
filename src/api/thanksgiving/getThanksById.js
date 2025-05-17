import axios from "axios";

export const getThanksById = async (id) => {
  const response = await axios.get(`/thanksgiving/${id}`);
  return response.data;
};
