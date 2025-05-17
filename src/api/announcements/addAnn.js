import axios from '../axiosInstance';

export const addAnn = async (data) => {
    console.log("Data to be sent:", data);
    // const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    // if (!token) {
    //   throw new Error("No token found. Please log in.");
    // }
    
  

    return await axios.post("/announcement", 
        {
        title: data.title.trim(),
        description: data.description.trim(),
        typeOfAnnouncement: data.typeOfAnnouncement,
        dateOfAnnouncement: new Date(data.dateOfAnnouncement).toISOString(),
        is_recurring: data.is_recurring,
        }
    );
}

