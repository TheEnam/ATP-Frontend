import axiosInstance from "../axiosInstance";

export const delAnn = async (id) => {
  return axiosInstance.delete(`/announcements/${id}`);
};
