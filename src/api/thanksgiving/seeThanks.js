import axiosInstance from '../axiosInstance';

export const getThanksgivings = async (filters = {}) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
        throw new Error("No token found. Please log in.");
    }
    const params = new URLSearchParams();
  
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
    if (filters.name) params.append("name", filters.name);
  
    const response = await axiosInstance.get(`/thanksgivings?${params.toString()}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = response.data;
    console.log("Thanks data from API:", response);

    return Array.isArray(data) ? data : data.thanksgivings || [];
  };