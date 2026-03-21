import axiosInstance from "../axiosInstance";

export const updateProgramme = async (id, data) => {
  const response = await axiosInstance.put(`/programmes/${id}`, data);
  return response.data;
};
