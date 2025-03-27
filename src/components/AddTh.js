import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AddThanksgiving() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    offering: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // You can add API call or state management logic here
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-xl font-semibold text-black mb-4">
          Add Thanksgiving
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name of Person */}
          <label className="block text-black font-medium">Name of Person</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg mt-1 bg-white text-black"
          />

          {/* Message */}
          <label className="block text-black font-medium mt-3">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
            className="w-full p-2 border rounded-lg mt-1 bg-white text-black"
          ></textarea>

          {/* Offering Amount */}
          <label className="block text-black font-medium mt-3">
            Offering Amount (GHS)
          </label>
          <input
            type="number"
            name="offering"
            value={formData.offering}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg mt-1 bg-white text-black"
          />

          {/* Date */}
          <label className="block text-black font-medium mt-3">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg mt-1 bg-white text-black"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 mt-4 border border-black rounded-lg bg-transparent text-black font-bold hover:bg-black hover:text-white"
          >
            Submit
          </button>
        </form>

        {/* Back Link */}
        <Link to="/" className="block text-center text-black mt-3">
          ⬅ Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
