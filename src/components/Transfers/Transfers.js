import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEye } from "react-icons/fa"; // Importing icons

export default function Transfers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");

  // Dummy transfer data (replace with actual data from API or state)
  const transfers = [
    { id: 1, name: "Bernd Obeng", type: "Transfer In", status: "Approved" },
    { id: 2, name: "Enam Avemegah", type: "Transfer Out", status: "1st Reading" },
  ];

    const [filterStatus, setFilterStatus] = useState("");
  // Filtered transfers based on search and filter type
  const filteredTransfers = transfers.filter(
    (transfer) =>
      (filterType === "" || transfer.type === filterType) &&
      (filterStatus === "" || transfer.status === filterStatus)
  );
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with Create Transfer Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Transfers</h1>
        <button
          onClick={() => navigate("/create-transfer")}
          className="flex items-center gap-2 bg-gray-100 text-black px-4 py-2 rounded-lg hover:bg-gray-500 transition"
        >
          <FaPlus /> Create Transfer
        </button>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
            className="p-2 border rounded"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            >
            <option value="">All Types</option>
            <option value="Transfer In">Transfer In</option>
            <option value="Transfer Out">Transfer Out</option>
            </select>

            <select
            className="p-2 border rounded"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            >
            <option value="">All Statuses</option>
            <option value="1st Reading">1st Reading</option>
            <option value="2nd Reading">2nd Reading</option>
            <option value="Approved">Approved</option>
        </select>

      </div>

      {/* Transfers List */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {/* Table Headers */}
        <div className="flex justify-between items-center font-semibold text-gray-700 border-b pb-2 mb-2">
          <p className="flex-1">Name</p>
          <p className="flex-1">Transfer Type</p>
          <p className="flex-1">Status</p>
          <p className="w-8"></p> {/* Placeholder for Eye Icon */}
        </div>
        
        {filteredTransfers.map((transfer) => (
          <div
            key={transfer.id}
            className="flex justify-between items-center p-4 border-b hover:bg-gray-100 cursor-pointer transition"
          >
            <p className="flex-1">{transfer.name}</p>
            <p className="text-sm text-gray-600 flex-1">{transfer.type}</p>
            <p className="text-sm text-gray-600 flex-1">{transfer.status}</p>
            <FaEye
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => navigate(`/transfer/${transfer.id}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}