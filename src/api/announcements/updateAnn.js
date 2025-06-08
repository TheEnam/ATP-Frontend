import axiosInstance from "../axiosInstance";

export const updateAnn = async (id, data) => {
  const payload = {
    ...data,
  };

  if (data.dateOfAnnouncement) {
    const parsedDate = new Date(data.dateOfAnnouncement);
    if (!isNaN(parsedDate.getTime())) {
      payload.dateOfAnnouncement = parsedDate.toISOString();
    } else {
      throw new Error("Invalid date value");
    }
  }

  console.log("Updating with payload:", payload);

  return axiosInstance.put(`/announcement/${id}`, payload);
};

