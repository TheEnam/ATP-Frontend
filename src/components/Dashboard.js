import React from "react";
import { AiOutlineFileText } from "react-icons/ai";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { RiFilter3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h2 className="text-xl font-semibold mb-5">All Announcements</h2>
      
      <div className="flex justify-start space-x-4 mb-6">
      {/* Add Announcement */}
      <div
        onClick={() => navigate("/add-announcement")}
        className="w-56 p-4 border rounded-lg shadow-sm flex flex-col items-start hover:shadow-md hover:bg-gray-300 cursor-pointer transition"
      >
        <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-lg">
          <AiOutlineFileText size={20} />
        </div>
        <p className="mt-3 font-medium">Add Announcement</p>
      </div>

      {/* Add Thanksgiving */}
      <div
        onClick={() => navigate("/add-thanksgiving")}
        className="w-56 p-4 border rounded-lg shadow-sm flex flex-col items-start hover:bg-gray-300 cursor-pointer hover:shadow-md transition"
      >
        <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg">
          <AiOutlineFileText size={20} />
        </div>
        <p className="mt-3 font-medium">Add Thanksgiving</p>
      </div>

      {/* Create Transfer */}
      <div
        onClick={() => navigate("/create-transfer")}
        className="w-56 p-4 border rounded-lg shadow-sm flex flex-col items-start hover:bg-gray-300 cursor-pointer hover:shadow-md transition"
      >
        <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg">
          <MdOutlineAttachMoney size={20} />
        </div>
        <p className="mt-3 font-medium">Create Transfer</p>
      </div>
    </div>

      {/* Search & Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative w-1/3">
          <IoSearchOutline className="absolute left-3 top-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search Announcements..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg bg-white shadow-sm"
          />
        </div>
        <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
          <RiFilter3Line />
          <span>Filters</span>
        </button>
      </div>

      {/* Announcements Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left bg-gray-200">
              <th className="p-3">Title</th>
              <th className="p-3">Last Modified</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[{ name: "Announcement 1", date: "Mar 6, 2025" },
              { name: "Thanksgiving 1", date: "Mar 4, 2025" },
              { name: "Lorem Ipsum .......", date: "Mar 8, 2025" }].map((file, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-3 flex items-center space-x-2">
                  <AiOutlineFileText className="text-gray-500" />
                  <span>{file.name}</span>
                </td>
                <td className="p-3">{file.date}</td>
                <td className="p-3 text-center">
                  <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                    <BsThreeDotsVertical />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end space-x-2 mt-6">
        {[1, 2, 3].map((num) => (
          <button key={num} className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">{num}</button>
        ))}
        <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">Next</button>
      </div>
    </div>
  );
}
