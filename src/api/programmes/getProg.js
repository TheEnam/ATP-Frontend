import axiosInstance from "../axiosInstance";

export const getAllProgrammes = async () => {
  const response = await axiosInstance.get("/programmes");
  return response.data;
};
