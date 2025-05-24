import axios from "../axiosInstance";

export const getAnn = async (filters) => {
  const query = new URLSearchParams();

  if (filters.startDate) query.append("startDate", filters.startDate);
  if (filters.endDate) query.append("endDate", filters.endDate);
  if (filters.typeOfAnnouncement) query.append("typeOfAnnouncement", filters.typeOfAnnouncement);

  const response = await axios.get(`/announcement`);
  return response.data;
};
