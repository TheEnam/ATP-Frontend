import axios from "../axiosInstance";

export const getAnn = async (typeOfAnnouncement = null) => {
  try {
    const response = await axios.get(`/announcement`, {
      params: typeOfAnnouncement ? { typeOfAnnouncement } : {},
    });

    const data = response.data;

    // Ensure it's always an array
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.announcements)) return data.announcements;

    return []; // fallback to empty array if none found
  } catch (error) {
    console.error("Error fetching announcements:", error.response || error.message);
    return [];
  }
};


