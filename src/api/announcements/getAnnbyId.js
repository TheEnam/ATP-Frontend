import axios from '../axiosInstance';

export const getAnnbyId = async (id) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
        throw new Error("No token found. Please log in.");
    }

   
    const response = await axios.get(`/announcements/${id}`);
    return response.data;
    // } catch (error) {
    //     console.error("Error fetching announcement by ID:", error);
    //     throw error;
    // }
}
