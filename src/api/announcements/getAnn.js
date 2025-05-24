import axios from "../axiosInstance";

export const getAnn = async (filters) => {
  const params = {};

  if (filters.startDate) params.startDate = filters.startDate;
  if (filters.endDate) params.endDate = filters.endDate;
  if (filters.typeOfAnnouncement) params.typeOfAnnouncement = filters.typeOfAnnouncement;

  const response = await axios.get(`/announcement`,{params});
  return response.data;
};
