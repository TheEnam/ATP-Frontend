import axios from "../axiosInstance";

export const getAnn = async (filters) => {
  const params = {};

  if (filters.startDate) query.append("startDate", filters.startDate);
  if (filters.endDate) query.append("endDate", filters.endDate);
  if (filters.typeOfAnnouncement) query.append("typeOfAnnouncement", filters.typeOfAnnouncement);

  const response = await axios.get(`/announcement`,{params});
  return response.data;
};
