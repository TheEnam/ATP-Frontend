import React, { useEffect, useState } from "react";
import { getAnn } from "../../api/announcements/getAnn";

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([]);
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAnn(type);
        setAnnouncements(data);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchData();
  }, [type]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Announcements</h2>

      <select
        className="p-2 border rounded mb-4"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">All</option>
        <option value="Local">Local</option>
        <option value="District">District</option>
        <option value="Zone">Zone</option>
      </select>

      <ul>
        {announcements.map((ann) => (
          <li key={ann._id} className="mb-3 border p-3 rounded shadow-sm">
            <h3 className="font-bold">{ann.title}</h3>
            <p>{ann.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(ann.dateOfAnnouncement).toLocaleString()} —{" "}
              {ann.typeOfAnnouncement}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
