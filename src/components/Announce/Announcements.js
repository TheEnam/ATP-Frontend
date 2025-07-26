import React, { useEffect, useState, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAnn } from "../../api/announcements/getAnn";
import { getAnnbyId } from "../../api/announcements/getAnnbyId";
import { delAnn } from "../../api/announcements/delAnn";
import { updateAnn } from "../../api/announcements/updateAnn";

export default function Announcements() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    typeOfAnnouncement: "",
  });

  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const closeModal = () => {
    setSelectedAnnouncement(null);
    setEditMode(false);
  };

  const announcementTitles = ["Keep Fit", "Bible Studies", "Midweek", "Afternoon Program", "Upcoming Programmes","Meetings", "Funeral", "Thanksgiving", "Others"];

    // Fetch announcements function
  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Fetching with filters:", filters);
      const data = await getAnn(filters.typeOfAnnouncement);
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAnnouncements();
  }, [filters, fetchAnnouncements]);

  const handleSaveEdit = async () => {
    try {
      const updatedData = {
        title: selectedAnnouncement.title.trim(),
        description: selectedAnnouncement.description.trim(),
        dateOfAnnouncement: new Date(selectedAnnouncement.dateOfAnnouncement),
        is_recurring: selectedAnnouncement.is_recurring || false,
        typeOfAnnouncement: selectedAnnouncement.typeOfAnnouncement,
      };

      await updateAnn(selectedAnnouncement._id, updatedData);
      alert("Announcement updated!");
      fetchAnnouncements();
      closeModal();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Could not update announcement.");
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchAnnouncements();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-center w-full">Announcements</h1>
        <button
          onClick={() => navigate("/add-announcement")}
          className="flex items-center gap-2 bg-gray-100 text-black px-4 py-2 rounded-lg hover:bg-gray-500 transition"
        >
          <FaPlus /> Add Announcement
        </button>
      </div>

      {/* Filter */}
      <form id="filter-announcement" onSubmit={handleFilterSubmit} className="flex flex-col md:flex-row md:space-x-4 mb-6">

        <select
          name="typeOfAnnouncement"
          value={filters.typeOfAnnouncement}
          onChange={handleFilterChange}
          className="p-2 border rounded mb-2 md:mb-0"
        >
          <option value="">All Types</option>
          <option value="Local">Local</option>
          <option value="District">District</option>
          <option value="Conference">Conference</option>
        </select>


        <button type="submit" className="bg-black text-white p-2 rounded hover:bg-gray-800">
          Filter
        </button>
      </form>

      {/* Announcement List */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : announcements.length === 0 ? (
        <p className="text-center">No announcements found.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Content</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((item) => (
                <tr
                  key={item._id}
                  className="border-t cursor-pointer hover:bg-gray-100 transition"
                  onClick={() =>
                    getAnnbyId(item._id)
                      .then((data) => setSelectedAnnouncement(data))
                      .catch((err) => console.error("Error getting details:", err))
                  }
                >
                  <td className="p-3">{item.title}</td>
                  <td className="p-3 truncate max-w-xs">{item.description}</td>
                  <td className="p-3">
                    {new Date(item.dateOfAnnouncement).toLocaleDateString("en-GB", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal */}
          {selectedAnnouncement && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-3 text-black text-xl font-bold"
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Announcement Details</h2>

                {editMode ? (
                  <>
                  <label className="block mb-2 font-semibold">Title</label>
                    <select
                      value={selectedAnnouncement.title}
                      className="w-full p-2 border rounded mb-2"
                      onChange={(e) =>
                        setSelectedAnnouncement({ ...selectedAnnouncement, title: e.target.value })
                      }
                    >
                      {announcementTitles.map((title) => (
                        <option key={title} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>

                    <label className="block mb-2 font-semibold">Type of Announcement</label>
                    <select
                      className="w-full p-2 border rounded mb-2"
                      value={selectedAnnouncement.typeOfAnnouncement}
                      onChange={(e) =>
                        setSelectedAnnouncement({ ...selectedAnnouncement, typeOfAnnouncement: e.target.value })
                      }>
                      <option value="Local">Local</option>
                      <option value="District">District</option>
                      <option value="Conference">Conference</option>
                    </select>

                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea
                      className="w-full p-2 border rounded mb-2"
                      value={selectedAnnouncement.description}
                      onChange={(e) =>
                        setSelectedAnnouncement({ ...selectedAnnouncement, description: e.target.value })
                      }
                    />

                    <input
                      type="date"
                      required
                      className="w-full p-2 border rounded mb-2"
                      value={selectedAnnouncement.dateOfAnnouncement?.slice(0, 10) || ""}
                      onChange={(e) =>
                        setSelectedAnnouncement({
                          ...selectedAnnouncement,
                          dateOfAnnouncement: e.target.value,
                        })
                      }
                    />

                    <label className="inline-flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={!!selectedAnnouncement.is_recurring}
                        onChange={(e) =>
                          setSelectedAnnouncement({
                            ...selectedAnnouncement,
                            is_recurring: e.target.checked,
                          })
                        }
                        className="form-checkbox"
                      />

                      <span className="ml-2">Is Recurring</span>
                    </label>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p><strong>Title:</strong> {selectedAnnouncement.title}</p>
                    <p><strong>Content:</strong> {selectedAnnouncement.description}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(selectedAnnouncement.dateOfAnnouncement).toLocaleDateString("en-GB", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                    </p>
                  </>
                )}

                <div className="flex justify-end gap-4 mt-6">
                  {!editMode && (
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  {!editMode && (
                    <button
                      onClick={async () => {
                        const confirmed = window.confirm("Delete this announcement?");
                        if (confirmed) {
                          try {
                            await delAnn(selectedAnnouncement._id);
                            alert("Deleted successfully!");
                            closeModal();
                            fetchAnnouncements();
                          } catch (error) {
                            console.error("Delete failed:", error);
                            alert("Delete failed!");
                          }
                        }
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/announcement-mode")}
          className="bg-gray-500 text-white px-3 py-3 rounded hover:bg-black transition"
        >
          📢 View in Announcement Mode
        </button>
      </div>
    </div>
  );
}
