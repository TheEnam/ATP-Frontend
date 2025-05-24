import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAnn } from "../../api/announcements/addAnn";

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
     setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value
  }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending data:", formData);
      await addAnn(formData);
      alert("Announcement added successfully!");
      navigate("/announcements");
    }catch (error) {
      if (error.response) {
        console.error("Server error:", error?.response?.data);
        alert(`Error: ${error.response.data?.message || "Bad Request"}`);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Check console for details.");
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
            className="w-full p-2 mt-1 border rounded"
            required
          />

          <label className="block text-gray-700 font-medium mt-3">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 mt-1 border rounded"
            required
          ></textarea>

          <label className="block text-gray-700 font-medium mt-3">
            Type of Announcement (Level)
          </label>
          <select
            name="typeOfAnnouncement"
            value={formData.typeOfAnnouncement}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
            required
          >
            <option value="">Select</option>
            <option value="Local">Local</option>
            <option value="District">District</option>
            <option value="Zonal">Conference</option>
          </select>

          <label className="block text-gray-700 font-medium mt-3">Date</label>
          <input
            type="datetime-local"
            name="dateOfAnnouncement"
            value={formData.dateOfAnnouncement}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
            required
          />

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              name="is_recurring"
              checked={formData.is_recurring}
              onChange={handleChange}
              className="mr-2"
            />
            Recurring Announcement
          </label>

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