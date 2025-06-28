import axiosInstance from "../axiosInstance";

export const deleteProgramme = async (id) => {
  const response = await axiosInstance.delete(`/programmes/${id}`);
  return response.data;
};
