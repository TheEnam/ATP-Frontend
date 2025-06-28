import axiosInstance from "../axiosInstance";

export const createProgramme = async (programmeData) => {
  const response = await axiosInstance.post('/programmes', programmeData);
  return response.data;
};
