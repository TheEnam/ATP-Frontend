import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addThanks } from "../../api/thanksgiving/addThanks";

export default function AddThanksgiving() {
  const [formData, setFormData] = useState({
    name: "",
    amount: 0,
    purpose: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending data:", formData);
      await addThanks(formData);
  
      alert("Thanksgiving added successfully!");
      window.location.href = "/thanksgivings";
      // Optionally clear form
      setFormData({ name: "", purpose: "", amount: 0, date: "" });
    } catch (error) {
      console.error("Failed to add thanksgiving:", error);
      alert("Failed to submit. Please try again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-xl font-semibold text-black mb-4">
          Add Thanksgiving
        </h2>
        <form id="add-thanks" onSubmit={handleSubmit}>
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

          {/* purpose */}
          <label className="block text-black font-medium mt-3">Message</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            rows="4"
            required
            className="w-full p-2 border rounded-lg mt-1 bg-white text-black"
          ></textarea>

          {/* Amount */}
          <label className="block text-black font-medium mt-3">
            Amount (GHS)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg mt-1 bg-white text-black"
            min={0}
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
        <Link to="/dashboard" className="block text-center text-black mt-3">
          ⬅ Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
