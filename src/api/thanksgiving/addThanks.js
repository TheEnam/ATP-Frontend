import axiosInstance from '../axiosInstance';   

export const addThanks = async (data) => {
  console.log("Data to be sent:", data);
  // const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  // if (!token) {
  //   throw new Error("No token found. Please log in.");
  // }

  return await axiosInstance.post("/thanksgiving", 
    {
      memberName: data.name.trim(),
      amount: Number(data.amount),
      message: data.purpose.trim(),
      dateOfThanksgiving: new Date(data.date).toISOString(),
    }
  );
};
