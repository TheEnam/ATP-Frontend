import axiosInstance from "../axiosInstance";

export const getDisplayOrder = async () => {
  try {
    const response = await axiosInstance.get("/display-order");
    return response?.data || {};
  } catch {
    return {};
  }
};
