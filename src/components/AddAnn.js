import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddAnn() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
          Add New Announcement
        </h2>
        <form>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            className="w-full p-2 mt-1 border rounded bg-white text-gray-700"
            required
          />

          <label className="block text-gray-700 font-medium mt-3">Input</label>
          <textarea
            rows="4"
            className="w-full p-2 mt-1 border rounded bg-white text-gray-700"
            required
          ></textarea>

          {/* <label className="block text-gray-700 font-medium mt-3">
            Select Tag
          </label> */}
          {/* <select className="w-full p-2 mt-1 border rounded bg-white text-gray-700">
            <option value="announcement">Announcement</option>
            <option value="announcement">Announcement</option>
            <option value="thanksgiving">Thanksgiving</option>
          </select> */}

          <label className="block text-gray-700 font-medium mt-3">
            Select Level
          </label>
          <select className="w-full p-2 mt-1 border rounded bg-white text-gray-700">
            <option value="">Level</option>
            <option value="zone">Zone</option>
            <option value="district">District</option>
            <option value="local">Local</option>
          </select>

          <label className="block text-gray-700 font-medium mt-3">
            Select Type
          </label>
          <select className="w-full p-2 mt-1 border rounded bg-white text-gray-700">
            <option value="outdooring">Select</option>
            <option value="outdooring">Outdooring</option>
            <option value="marriage">Marriage</option>
            <option value="funeral">Funeral</option>
          </select>

          <button
            type="submit"
            className="w-full mt-4 p-2 border border-black rounded bg-transparent text-black font-bold hover:bg-black hover:text-white transition"
          >
            Submit
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="block text-center text-black mt-3"
        >
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
}
