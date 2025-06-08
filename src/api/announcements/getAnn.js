import axios from "../axiosInstance";

export const getAnn = async (typeOfAnnouncement = null) => {
  try {
    const response = await axios.get(`/announcement`, {
      params: typeOfAnnouncement ? { typeOfAnnouncement } : {},
    });

    const data = response.data;
    console.log("Announcements data from API:", response);

    if (Array.isArray(data)) return data;
    if (Array.isArray(data.announcements)) return data.announcements;

    return [];
  } catch (error) {
    console.error("Error fetching announcements:", error.response || error.message);
    return [];
  }
};


