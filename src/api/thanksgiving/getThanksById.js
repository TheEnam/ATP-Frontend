import axios from "../axiosInstance";

export const getThanksById = async (id) => {
  const response = await axios.get(`/thanksgivings/${id}`);
  return response.data;
};
