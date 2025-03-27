import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTransfer() {
  const navigate = useNavigate();
  const [transferType, setTransferType] = useState("");
  const [baptismalCert, setBaptismalCert] = useState(null);

  const handleFileChange = (e) => {
    setBaptismalCert(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
          Create Transfer
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input type="text" className="w-full p-2 mt-1 border rounded bg-white" required />

          {/* Date of Birth */}
          <label className="block text-gray-700 font-medium mt-3">Date of Birth</label>
          <input type="date" className="w-full p-2 mt-1 border rounded bg-white" required />

          {/* Date of Baptism */}
          <label className="block text-gray-700 font-medium mt-3">Date of Baptism</label>
          <input type="date" className="w-full p-2 mt-1 border rounded bg-white" required />

          {/* Pastor Who Baptized */}
          <label className="block text-gray-700 font-medium mt-3">Pastor Who Baptized</label>
          <input type="text" className="w-full p-2 mt-1 border rounded bg-white" required />

          {/* Names of Parents */}
          <label className="block text-gray-700 font-medium mt-3">Names of Parents</label>
          <input type="text" className="w-full p-2 mt-1 border rounded bg-white" required />

          {/* Transfer Type */}
          <label className="block text-gray-700 font-medium mt-3">Transfer Type</label>
          <select
            className="w-full p-2 mt-1 border rounded bg-white"
            value={transferType}
            onChange={(e) => setTransferType(e.target.value)}
            required
          >
            <option value="">Select Transfer Type</option>
            <option value="transfer-in">Transfer In</option>
            <option value="transfer-out">Transfer Out</option>
          </select>

          {/* Church & District Fields (Conditional) */}
          {transferType === "transfer-in" && (
            <>
              {/* From Church (User Input) */}
              <label className="block text-gray-700 font-medium mt-3">From Church</label>
              <input type="text" className="w-full p-2 mt-1 border rounded bg-white" required />

              {/* From District (User Input) */}
              <label className="block text-gray-700 font-medium mt-3">From District</label>
              <input type="text" className="w-full p-2 mt-1 border rounded bg-white" required />

              {/* To Church (Auto-filled) */}
              <label className="block text-gray-700 font-medium mt-3">To Church</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border rounded bg-gray-100"
                value="Legon Seventh-Day Adventist Church"
                readOnly
              />

              {/* To District (Auto-filled) */}
              <label className="block text-gray-700 font-medium mt-3">To District</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border rounded bg-gray-100"
                value="Legon District"
                readOnly
              />
            </>
          )}

          {transferType === "transfer-out" && (
            <>
              {/* From Church (Auto-filled) */}
              <label className="block text-gray-700 font-medium mt-3">From Church</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border rounded bg-gray-100"
                value="Legon Seventh-Day Adventist Church"
                readOnly
              />

              {/* From District (Auto-filled) */}
              <label className="block text-gray-700 font-medium mt-3">From District</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border rounded bg-gray-100"
                value="Legon District"
                readOnly
              />

              {/* To Church (User Input) */}
              <label className="block text-gray-700 font-medium mt-3">To Church</label>
              <input type="text" className="w-full p-2 mt-1 border rounded bg-white" required />

              {/* To District (User Input) */}
              <label className="block text-gray-700 font-medium mt-3">To District</label>
              <input type="text" className="w-full p-2 mt-1 border rounded bg-white" required />
            </>
          )}

          {/* Baptismal Certificate Upload */}
          <label className="block text-gray-700 font-medium mt-3">Baptismal Certificate</label>
          <input type="file" className="w-full p-2 mt-1 border rounded bg-white" onChange={handleFileChange} required />
          {baptismalCert && <p className="text-sm text-gray-500">Uploaded: {baptismalCert.name}</p>}

          {/* Approved Reading */}
          <label className="block text-gray-700 font-medium mt-3">Approved Reading</label>
          <select className="w-full p-2 mt-1 border rounded bg-white" required>
            <option value="">Select Reading</option>
            <option value="1st">1st Reading</option>
            <option value="2nd">2nd Reading</option>
            <option value="3rd">3rd Reading</option>
            <option value="Approved">Approved</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 p-2 border border-black rounded bg-transparent text-black font-bold hover:bg-black hover:text-white transition"
          >
            Submit Transfer
          </button>
        </form>

        <button onClick={() => navigate("/")} className="block text-center text-black mt-3">
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
}
