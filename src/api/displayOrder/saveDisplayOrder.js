import axiosInstance from "../axiosInstance";

export const saveDisplayOrder = async (patch) => {
  try {
    await axiosInstance.patch("/display-order", patch);
  } catch {
    // Keep UI responsive even when persistence endpoint is temporarily unavailable.
  }
};
