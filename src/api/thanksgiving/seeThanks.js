import axios from '../axiosInstance';

export const getThanksgivings = async (filters = {}) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
        throw new Error("No token found. Please log in.");
    }
    const params = new URLSearchParams();
  
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
    if (filters.name) params.append("name", filters.name);
  
    const response = await axios.get(`/thanksgiving?${params.toString()}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
  };