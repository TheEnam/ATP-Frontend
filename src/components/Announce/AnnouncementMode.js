import React, { useEffect, useState } from "react";
import { getAnn } from "../../api/announcements/getAnn";
import { useNavigate } from "react-router-dom";
import { TiInfinityOutline } from "react-icons/ti";
import { LiaGripLinesSolid } from "react-icons/lia";
import DraggableLocalSection from "./DraggableLocalSection";

const groupAndFilterAnnouncements = (announcements) => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  
  
  const isThisWeek = (dateStr) => {
    const date = new Date(dateStr);
    return date >= startOfWeek && date <= endOfWeek;
  };
  
  const grouped = {
    Conference: [],
    District: [],
    Local: [],
    Transfers: {
      firstReadingIn: [],
      firstReadingOut: [],
      secondReadingIn: [],
      secondReadingOut: [],
    },
  };

  
  announcements.forEach((ann) => {
    if (!isThisWeek(ann.dateofAnnouncement) && !ann.is_recurring) return;
    
    if (ann.typeOfAnnouncement === "Conference") {
      grouped.Conference.push(ann);
    } else if (ann.typeOfAnnouncement === "District") {
      grouped.District.push(ann);
    } else if (ann.typeOfAnnouncement === "Local") {
      grouped.Local.push(ann);
    } else if (ann.typeOfAnnouncement === "Transfer") {
      const reading = ann.reading?.toLowerCase();
      const direction = ann.direction?.toLowerCase(); // "in" or "out"
      
      if (reading === "first") {
        grouped.Transfers[`firstReading${direction === "in" ? "In" : "Out"}`].push(ann);
      } else if (reading === "second") {
        grouped.Transfers[`secondReading${direction === "in" ? "In" : "Out"}`].push(ann);
      }
    }
  });
  
  const desiredLocalOrder = ["Afternoon Program","Keep Fit","Bible Studies","Midweek","Upcoming Programmes","Meetings","Funeral","Thanksgiving","Transfers", ""];
  
  const localGrouped = {};

  desiredLocalOrder.forEach((category) => {
    localGrouped[category] = [];
  });

  grouped.Local.forEach((ann) => {
    const match = desiredLocalOrder.find((category) =>
      ann.title?.toLowerCase().includes(category.toLowerCase())
    );
    if (match) {
      localGrouped[match].push(ann);
    } else {
      // Put unmatched ones under "Others" or something optional
      localGrouped["Others"] = localGrouped["Others"] || [];
      localGrouped["Others"].push(ann);
    }
  });

  grouped.Local = localGrouped;

  return grouped;
};


const Section = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-xl shadow p-6 mb-10">
      {/* Fancy title with icon-based line */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex-1 h-px bg-gray-300 mr-3 flex items-center justify-end">
          {/* Left line with repeated icon */}
          <div className="flex space-x-1 text-gray-400">
            {[...Array(7)].map((_, i) => (
              <TiInfinityOutline key={i} />
            ))}
          </div>
        </div>

        <h3 className="text-xl font-bold text-center text-gray-800 mx-4 whitespace-nowrap">
          {title}
        </h3>

        <div className="flex-1 h-px bg-gray-300 ml-3 flex items-center justify-start">
          {/* Right line with repeated icon */}
          <div className="flex space-x-1 text-gray-400">
            {[...Array(7)].map((_, i) => (
              <LiaGripLinesSolid key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Bullet announcements */}
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="bg-white rounded-md shadow-sm p-4">
            <h4 className="font-semibold text-gray-900">{item.title}</h4>
            <p className="text-gray-700 mt-1 text-sm whitespace-pre-line">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default function AnnouncementMode() {
  const [groupedAnnouncements, setGroupedAnnouncements] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const all = await getAnn(); // Fetch all announcements
        const grouped = groupAndFilterAnnouncements(all);
        setGroupedAnnouncements(grouped);
      } catch (err) {
        console.error("Failed to load announcement mode:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center justify-center min-w-screen min-h-screen mt-10 bg-white">Loading announcements...</p>;

  // Get today's date in a readable format
  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Announcements  - {formattedDate}
      </h1>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow space-y-10">
        <Section title="Conference" items={groupedAnnouncements.Conference} />
        <Section title="District" items={groupedAnnouncements.District} />
        <DraggableLocalSection title="Local" localData={groupedAnnouncements.Local} />
{/* 
        <div className="space-y-6">
          <h2 className="text-2xl text-center font-bold text-gray-800 underline decoration-2 underline-offset-4 mb-4">
            Transfers
          </h2>
          <Section title="First Reading - Transfer In" items={groupedAnnouncements.Transfers.firstReadingIn} />
          <Section title="First Reading - Transfer Out" items={groupedAnnouncements.Transfers.firstReadingOut} />
          <Section title="Second Reading - Transfer In" items={groupedAnnouncements.Transfers.secondReadingIn} />
          <Section title="Second Reading - Transfer Out" items={groupedAnnouncements.Transfers.secondReadingOut} />
        </div> */}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/announcements")}
          className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-900 transition"
        >
          ← Back to Announcements
        </button>
      </div>
    </div>
  );
}
