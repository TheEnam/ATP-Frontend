import axios from "../axiosInstance";

export const getAnn = async(typeOfAnnouncement = null) => {
  try {
    const response = await axios.get(`/announcement`, {
      params: typeOfAnnouncement ? { typeOfAnnouncement } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching announcements:", error.response || error.message);
    throw error;
  }
}

