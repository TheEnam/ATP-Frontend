import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAnn } from "../api/announcements/addAnn";

export default function AddAnn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    typeOfAnnouncement: "",
    dateOfAnnouncement: "",
    is_recurring: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending data:", formData);
      await addAnn(formData);

      alert("Announcement added successfully!");
      navigate("/announcements"); // update route as needed
    }catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response);
        alert(`Error: ${error.response.data?.message || "Failed to submit."}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response from server. Check your internet connection.");
      } else {
        console.error("Error setting up request:", error.message);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
          Add New Announcement
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded bg-white text-gray-700"
            required
          />

          <label className="block text-gray-700 font-medium mt-3">Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded bg-white text-gray-700"
            required
          ></textarea>

          <label className="block text-gray-700 font-medium mt-3">
            Announcement Type
          </label>
          <select
            name="typeOfAnnouncement"
            value={formData.typeOfAnnouncement}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded bg-white text-gray-700"
          >
            <option value="" disabled>Level</option>
            <option value="conference">Conference</option>
            <option value="district">District</option>
            <option value="local">Local</option>
          </select>

          <label className="block text-gray-700 font-medium mt-3">
            Date of Announcement
          </label>
          <input
            type="date"
            name="dateOfAnnouncement"
            value={formData.dateOfAnnouncement}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded bg-white text-gray-700"
            required
          />

          <button
            type="submit"
            className="w-full mt-4 p-2 border border-black rounded bg-transparent text-black font-bold hover:bg-black hover:text-white transition"
          >
            Submit
          </button>
        </form>

        <button
          onClick={() => navigate("/dashboard")}
          className="block text-center text-black mt-3"
        >
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
}
