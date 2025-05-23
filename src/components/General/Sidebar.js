import React from "react";
import { Link } from "react-router-dom";
import { RiHomeSmile2Line, RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineSettingsSuggest, MdDarkMode } from "react-icons/md";
import { MdTransferWithinAStation } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { GrNotes, GrAnnounce} from "react-icons/gr";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (confirmLogout) {
        // You can also clear any authentication data or tokens here
        navigate("/");  // Redirect to Home page after logout confirmation
      }
    };

    return (
      <div className="bg-gray-100 p-4 h-screen w-1/6 flex flex-col justify-between">
        {/* Top Section */}
        <div>
          <Link to="/" className="flex flex-row items-center space-x-3 mb-7">
            <GrNotes />
            <p className="text-xl font-semibold">LESCetariat</p>
          </Link>
  
          <div className="text-gray-500 flex flex-col space-y-4">
            <Link to="/dashboard" className="flex flex-row items-center space-x-3 p-2 rounded-lg hover:bg-gray-300">
              <RiHomeSmile2Line />
              <p>Dashboard</p>
            </Link>
  
            <Link to="/announcements" className="flex flex-row items-center space-x-3 p-2 rounded-lg hover:bg-gray-300">
              <GrAnnounce />
              <p>Announcements</p>
            </Link>
  
            <Link to="/thanksgivings" className="flex flex-row items-center space-x-3 p-2 rounded-lg hover:bg-gray-300">
              <GiPayMoney />
              <p>Thanksgiving</p>
            </Link>

            <Link to="/all-transfers" className="flex flex-row items-center space-x-3 p-2 rounded-lg hover:bg-gray-300">
              <MdTransferWithinAStation />
              <p>Transfers</p>
            </Link>
  
  
            <div className="flex flex-row items-center space-x-3 p-2 rounded-lg hover:bg-gray-300 cursor-pointer">
              <RiDeleteBin6Line />
              <p>Programs</p>
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
            <MdDarkMode />
            <p>Dark Mode</p>
          </div>
          <div className="flex flex-row items-center space-x-3 p-2 rounded-lg hover:bg-gray-300 cursor-pointer">
            <MdOutlineSettingsSuggest />
            <p>Settings</p>
          </div>
          <div
            onClick={handleLogout}
            className="flex flex-row items-center space-x-3 p-2 rounded-lg hover:bg-gray-300 cursor-pointer"
          >
            <MdLogout />
            <p>Logout</p>
          </div>
        </div>
      </div>
    );
  }
  