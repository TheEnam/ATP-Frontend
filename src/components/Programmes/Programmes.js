import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function Programmes() {
  const navigate = useNavigate();

  // Dummy programme data (replace with API data later)
  const programmes = [
    { id: 1, title: "Health Awareness Seminar", department: "Health", date: "2025-06-10" },
    { id: 2, title: "Women's Ministries Retreat", department: "Women's Ministries", date: "2025-07-05" },
    { id: 3, title: "Youth Leadership Conference", department: "Youth", date: "2025-08-15" },
    { id: 4, title: "Community Service Day", department: "Community Outreach", date: "2025-09-20" },
    { id: 5, title: "Family Life Seminar", department: "Family Life", date: "2025-10-25" },
    { id: 6, title: "Bible Study Series", department: "Bible Study", date: "2025-11-30" },
    { id: 7, title: "Music and Arts Festival", department: "Music and Arts", date: "2025-12-15" },
    { id: 10, title: "Leadership Training Workshop", department: "Leadership Development", date: "2026-03-01" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header with Create Programme Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Programmes</h1>
        <button
          onClick={() => navigate("/create-programme")}
          className="flex items-center gap-2 bg-gray-100 text-black px-4 py-2 rounded-lg hover:bg-gray-500 transition"
        >
          <FaPlus /> Add Programme
        </button>
      </div>

      {/* Programmes List */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {/* Table Header */}
        <div className="flex font-semibold text-gray-700 border-b pb-2 mb-2">
          <p className="flex-1">Title</p>
          <p className="flex-1">Department</p>
          <p className="flex-1">Date</p>
        </div>

        {/* Programmes Rows */}
        {programmes.map((programme) => (
          <div
            key={programme.id}
            className="flex items-center p-4 border-b hover:bg-gray-100 transition"
          >
            <p className="flex-1">{programme.title}</p>
            <p className="flex-1 text-gray-600">{programme.department}</p>
            <p className="flex-1 text-gray-600">{programme.date}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/announcement-mode")}
          className="border text-black px-3 py-3 rounded hover:bg-black hover:text-white transition"
        >
          📢 Generate Quaterly Programmes
        </button>
      </div>
    </div>
  );
}
