import axiosInstance from "../axiosInstance";

export const updateAnn = async (id, data) => {
  return axiosInstance.patch(`/announcement/${id}`, {
    ...data,
    dateOfAnnouncement: new Date(data.dateOfAnnouncement).toISOString(),
  });
};
