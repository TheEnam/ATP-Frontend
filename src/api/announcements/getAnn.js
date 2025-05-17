import axios from "../axiosInstance";

export const getAnn = async (typeOfAnnouncement = "") => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
        throw new Error("No token found. Please log in.");
    }

    const response = await axios.get("/announcement", {
    params: {
      typeOfAnnouncement,
    },
  });
  return response.data;
};