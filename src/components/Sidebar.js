import React from "react";
import { Link } from "react-router-dom";
import { RiHomeSmile2Line, RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineSettingsSuggest, MdDarkMode } from "react-icons/md";
import { MdTransferWithinAStation } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { IoIosAddCircleOutline, IoIosArrowDown } from "react-icons/io";
import { GrNotes } from "react-icons/gr";

export default function Sidebar() {
    return (
      <div className="bg-gray-100 p-4 h-screen w-1/6 flex flex-col justify-between">
        {/* Top Section */}
        <div>
          <div className="flex flex-row items-center space-x-3 mb-7">
            <GrNotes />
            <p className="text-xl">LESCetariat</p>
          </div>
  
          <div className="text-gray-500 flex flex-col space-y-4">
            <Link to="/" className="flex flex-row items-center space-x-3 p-2 rounded-lg hover:bg-gray-300">
              <RiHomeSmile2Line />
              <p>Dashboard</p>
            </Link>
  
            <Link to="/add-announcement" className="flex flex-row items-center space-x-3 p-2 rounded-lg hover:bg-gray-300">
              <IoIosAddCircleOutline />
              <p>Add Announcement</p>
            </Link>
  
            <Link to="/add-thanksgiving" className="flex flex-row items-center space-x-3 p-2 rounded-lg hover:bg-gray-300">
              <GiPayMoney />
              <p>Add Thanksgiving</p>
            </Link>

            <Link to="/create-transfer" className="flex flex-row items-center space-x-3 p-2 rounded-lg hover:bg-gray-300">
              <MdTransferWithinAStation />
              <p>Create Transfer</p>
            </Link>
  
  
            <div className="flex flex-row items-center space-x-3 p-2 rounded-lg hover:bg-gray-300 cursor-pointer">
              <RiDeleteBin6Line />
              <p>Deleted Announcements</p>
            </div>
          </div>
        </div>
  
        {/* Bottom Section */}
        <div className="text-gray-500 flex flex-col space-y-4">
          <p>Announcement Browser</p>
          <div className="flex flex-row items-center space-x-3 p-2 rounded-lg hover:bg-gray-300 cursor-pointer">
            <IoIosArrowDown />
            <p>Announcements</p>
          </div>
          <div className="flex flex-row items-center space-x-3 p-2 rounded-lg hover:bg-gray-300 cursor-pointer">
              <MdTransferWithinAStation />
              <p>Transfers</p>
            </div>
          <div className="flex flex-row items-center space-x-3 p-2 rounded-lg hover:bg-gray-300 cursor-pointer">
            <MdOutlineSettingsSuggest />
            <p>Settings</p>
          </div>
          <div className="flex flex-row items-center space-x-3 p-2 rounded-lg hover:bg-gray-300 cursor-pointer">
            <MdDarkMode />
            <p>Dark Mode</p>
          </div>
        </div>
      </div>
    );
  }
  