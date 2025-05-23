import React, { useEffect, useState } from "react";
import { getAnn } from "../../api/announcements/getAnn";
import { delAnn } from "../../api/announcements/delAnn"; // You'll need to create this
import { updateAnn } from "../../api/announcements/updateAnn"; // You'll need to create this

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [type, setType] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    dateOfAnnouncement: "",
  });

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

  const handleEditClick = (ann) => {
    setEditingId(ann._id);
    setEditForm({
      title: ann.title,
      description: ann.description,
      dateOfAnnouncement: ann.dateOfAnnouncement.slice(0, 10),
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateAnn(editingId, editForm);
      await updateAnn(editingId, editForm);
      setEditingId(null);
      // Refetch announcements after update
      const data = await getAnn(type);
      setAnnouncements(data);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this announcement?")) {
        await delAnn(id);
        // Refetch announcements after delete
        const data = await getAnn(type);
        setAnnouncements(data);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Announcements</h2>

      {/* Filter dropdown */}
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

      {/* Announcement list */}
      <ul>
        {announcements.map((ann) => (
          <li key={ann._id} className="mb-3 border p-3 rounded shadow-sm">
            {editingId === ann._id ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  className="block w-full p-1 border rounded mb-2"
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="block w-full p-1 border rounded mb-2"
                />
                <input
                  type="date"
                  name="dateOfAnnouncement"
                  value={editForm.dateOfAnnouncement}
                  onChange={handleEditChange}
                  className="block w-full p-1 border rounded mb-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-2 py-1 bg-gray-300 text-black rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-bold">{ann.title}</h3>
                <p>{ann.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(ann.dateOfAnnouncement).toLocaleString()} —{" "}
                  {ann.typeOfAnnouncement}
                </p>
                <button
                  onClick={() => handleEditClick(ann)}
                  className="mt-2 mr-2 text-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(ann._id)}
                  className="mt-2 text-red-600"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
