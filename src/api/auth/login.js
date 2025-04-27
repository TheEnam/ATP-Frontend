import axios from "../axiosInstance";

export const login = async (data) => {
  try {
    const response = await axios.post("/auth/login", {
      fullname: data.name,
      email: data.email,
      password: data.password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// export const logout = async () => {
//   const response = await axios.post("/auth/logout", {}, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });
//   return response.data;
// };
