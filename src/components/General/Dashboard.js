import React, { useState, useEffect } from "react";
import { AiOutlineFileText } from "react-icons/ai";
import { MdTransferWithinAStation } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import { RiFilter3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { getAnn } from "../../api/announcements/getAnn";
import { getThanksgivings } from "../../api/thanksgiving/seeThanks";
// import { getTransfers } from "../../api/transfers/getTransfers";

export default function Dashboard() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [thanksgivings, setThanksgivings] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [error, setError] = useState(null);

  const [selectedFilter, setSelectedFilter] = useState("View all");

  useEffect(() => {
    async function fetchData() {
      try {
        const annData = await getAnn();         // Call your imported function
        const thanksData = await getThanksgivings();   // Call your imported function
        // const transferData = await getTransfers(); // Call your transfers function

        setAnnouncements(annData);
        setThanksgivings(thanksData);
        // setTransfers(transferData);
      } catch (err) {
        setError("Failed to fetch data");
      }
    }

    fetchData();
  }, []);



  const [programmes, setProgrammes] = useState([
    { title: "Youth Summit", department: "Youth", date: "2025-05-25" },
    { title: "Women's Conference", department: "Women's Ministry", date: "2025-05-27" },
    { title: "Health Week", department: "Health Ministry", date: "2025-05-31"},
    { title: "Men's Week of Prayer", department: "Men's Ministry", date: "2025-06-01" },
    { title: "Family Retreat", department: "Family Life", date: "2025-06-05" },
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isToday = (dateString) => {
    const inputDate = new Date(dateString);

    return (
      inputDate.getFullYear() === today.getFullYear() &&
      inputDate.getMonth() === today.getMonth() &&
      inputDate.getDate() === today.getDate()
    );
  };

  const isUpcoming = (item) => new Date(item.date) >= today;
  const sortByDateAsc = (a, b) => new Date(a.date) - new Date(b.date);

  const upcomingAnnouncements = announcements.filter(isUpcoming).sort(sortByDateAsc);
  const upcomingThanksgivings = thanksgivings.filter(isUpcoming).sort(sortByDateAsc);
  const upcomingTransfers = transfers.filter(isUpcoming).sort(sortByDateAsc);

  const allItems = [...upcomingAnnouncements, ...upcomingTransfers, ...upcomingThanksgivings];

  let displayedItems = [];

  if (selectedFilter === "View all") displayedItems = allItems;
  else if (selectedFilter === "Announcements") displayedItems = upcomingAnnouncements;
  else if (selectedFilter === "Transfers") displayedItems = upcomingTransfers;
  else if (selectedFilter === "Thanksgiving") displayedItems = upcomingThanksgivings;
  else displayedItems = [];

  // Manage dropdown visibility
  // const [showDropdown, setShowDropdown] = useState(null);

  if (error) return <p>{error}</p>;
  // Filter programmes to show only upcoming ones

  const upcomingProgrammes = programmes
    .filter((programme) => {
      const programmeDate = new Date(programme.date);
      programmeDate.setHours(0, 0, 0, 0);
      return programmeDate >= today;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // const toggleDropdown = (index) => {
  //   setShowDropdown(showDropdown === index ? null : index);  // Toggle dropdown visibility
  // };

  // const handleEdit = (itemName) => {
  //   console.log(`Editing ${itemName}`);
  //   // You can navigate to the editing page or open a modal for editing
  //   // navigate(`/edit-announcement/${itemName}`);
  // };

  // const handleDelete = (itemName) => {
  //   console.log(`Deleting ${itemName}`);
  //   // You can show a confirmation dialog before deleting
  //   // Confirm and delete the item
  // };

  return (
    <div className="flex-1 p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-xl font-semibold mb-5">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Add Announcement",
            icon: <AiOutlineFileText size={18} />,
            dark: false,
            path: "/add-announcement",
          },
          {
            label: "Add Thanksgiving",
            icon: <GiPayMoney size={18} />,
            dark: false,
            path: "/add-thanksgiving",
          },
          {
            label: "Create Transfer",
            icon: <MdTransferWithinAStation size={18} />,
            dark: false,
            path: "/create-transfer",
          },
          {
            label: "Order of Service",
            icon: <HiOutlineUserGroup size={18} />,
            dark: false,
            path: "/new-team",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(item.path)}
            className="relative max-w-sm w-full px-3 py-4 border rounded-xl shadow-sm transition-colors hover:bg-gray-100 hover:shadow-md shadow-md cursor-pointer"
          >
            {/* Plus icon at top-right */}
            <span className="absolute top-2 right-3 text-gray-500 text-lg font-semibold">
              +
            </span>

            {/* Content aligned to the left */}
            <div className="flex flex-col items-start space-y-2">
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-lg ${
                  item.dark ? "bg-black text-white" : "bg-gray-100 text-black"
                }`}
              >
                {item.icon}
              </div>
              <span className="text-sm">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Programmes */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-gray-700 text-md font-semibold">Upcoming Programmes</h2>
        </div>
        {upcomingProgrammes.length === 0 ? (
          <p className="text-gray-500 text-sm">No upcoming programmes.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {upcomingProgrammes.map((programme, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition"
              >
                <h3 className="font-semibold mb-1">{programme.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{programme.department}</p>
                <p className="text-sm">
                  {isToday(programme.date) ? (
                    <span className="text-red-500 font-semibold">Today</span>
                  ) : (
                    new Date(programme.date).toDateString()
                  )}
                </p>
              </div>
            ))}
          </div>

        )}
      </div>


      <h3 className="text-gray-700 text-sm font-semibold mb-3">All Items</h3>

      {/* File Filters + Search */}
       <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex flex-wrap space-x-3 bg-gray-100 p-2 rounded mb-4">
            {["View all", "Announcements", "Thanksgiving", "Transfers"].map((label) => (
              <button
                key={label}
                onClick={() => setSelectedFilter(label)}
                className={`px-4 py-2 rounded-lg text-sm border transition ${
                  selectedFilter === label
                    ? "bg-white text-black"
                    : "text-gray-700 border-transparent hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <IoSearchOutline className="absolute left-3 top-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-64 border rounded-lg text-sm bg-white"
            />
          </div>
          <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border hover:bg-gray-100 hover:shadow-md">
            <RiFilter3Line />
            <span className="text-sm">Filters</span>
          </button>
        </div>
      </div>

      {/* Displayed Items List */}
      <div>
        {displayedItems.length === 0 ? (
          <p className="text-gray-500">No upcoming {selectedFilter.toLowerCase()}.</p>
        ) : (
          displayedItems.map((item) => (
            <div key={item.id} className="p-3 mb-2 bg-white rounded shadow">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">{new Date(item.date).toDateString()}</p>
            </div>
          ))
        )}
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