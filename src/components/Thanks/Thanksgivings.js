import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getThanksgivings } from "../../api/thanksgiving/seeThanks";
import { deleteThanksgiving } from "../../api/thanksgiving/deleteThanks";
import { updateThanksgiving } from "../../api/thanksgiving/updateThanks";
import { getThanksById} from "../../api/thanksgiving/getThanksById";

export default function Thanksgivings() {
  const navigate = useNavigate();
  const [thanksgivings, setThanksgivings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    name: "",
  });

  const [selectedThanks, setSelectedThanks] = useState(null);
  const closeModal = () => setSelectedThanks(null);

  const [editMode, setEditMode] = useState(false);
  const handleSaveEdit = async () => {
    try {
      const updatedData = {
        memberName: selectedThanks.memberName.trim(),
        message: selectedThanks.message.trim(),
        amount: Number(selectedThanks.amount),
        dateOfThanksgiving: new Date(selectedThanks.dateOfThanksgiving).toISOString(),
      };
  
      await updateThanksgiving(selectedThanks._id, updatedData);
      alert("Record updated!");
      setEditMode(false);
      fetchThanksgivings();
      closeModal();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Could not update record.");
    }
  };

  const fetchThanksgivings = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await getThanksgivings(filters);
      setThanksgivings(data);
      console.log("Fetched thanksgivings:", data);
    } catch (error) {
      console.error("Error fetching thanksgivings:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchThanksgivings();
  }, [fetchThanksgivings]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchThanksgivings();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-center w-full">Thanksgiving Records</h1>
        <button
          onClick={() => navigate("/add-thanksgiving")}
          className="flex items-center gap-2 bg-gray-100 text-black px-4 py-2 rounded-lg hover:bg-gray-500 transition"
        >
          <FaPlus /> Add Thanksgiving
        </button>
      </div>

      {/* Filter Form */}
      <form onSubmit={handleFilterSubmit} className="flex flex-col md:flex-row md:space-x-4 mb-6">
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="p-2 border rounded mb-2 md:mb-0"
          placeholder="Start Date"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="p-2 border rounded mb-2 md:mb-0"
          placeholder="End Date"
        />
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          className="p-2 border rounded mb-2 md:mb-0"
          placeholder="Giver's Name"
        />
        <button
          type="submit"
          className="bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Filter
        </button>
      </form>

      {/* Thanksgiving List */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : thanksgivings.length === 0 ? (
        <p className="text-center">No thanksgiving records found.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Purpose</th>
                <th className="p-3 text-left">Amount (GHS)</th>
                <th className="p-3 text-left">Date (dd/mm/yy)</th>
              </tr>
            </thead>
            <tbody>
              {thanksgivings.map((tg) => (
                <tr
                  key={tg._id}
                  className="border-t cursor-pointer hover:bg-gray-100 transition"
                  onClick={() =>
                    getThanksById(tg._id)
                      .then((data) => {
                        setSelectedThanks(data);
                      })
                      .catch((error) => {
                        console.error("Error fetching thanksgiving by ID:", error);
                      })
                  }
                >
                  <td className="p-3">{tg.memberName}</td>
                  <td className="p-3">{tg.message}</td>
                  <td className="p-3">{tg.amount}</td>
                  <td className="p-3">
                    {new Date(tg.dateOfThanksgiving).toLocaleDateString("en-GB", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

          {selectedThanks && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-3 text-black text-xl font-bold"
                >
                  &times;
                </button>
                <h2 className="text-xl font-semibold mb-4">Thanksgiving Details</h2>

                {editMode ? (
                  <>
                    <input
                      className="w-full p-2 border rounded mb-2"
                      value={selectedThanks.memberName}
                      onChange={(e) =>
                        setSelectedThanks({ ...selectedThanks, memberName: e.target.value })
                      }
                    />
                    <textarea
                      className="w-full p-2 border rounded mb-2"
                      value={selectedThanks.message}
                      onChange={(e) =>
                        setSelectedThanks({ ...selectedThanks, message: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      className="w-full p-2 border rounded mb-2"
                      value={selectedThanks.amount}
                      onChange={(e) =>
                        setSelectedThanks({ ...selectedThanks, amount: e.target.value })
                      }
                    />
                    <input
                      type="date"
                      className="w-full p-2 border rounded mb-2"
                      value={selectedThanks.dateOfThanksgiving?.slice(0, 10)}
                      onChange={(e) =>
                        setSelectedThanks({
                          ...selectedThanks,
                          dateOfThanksgiving: e.target.value,
                        })
                      }
                    />
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
                      <p><strong>Name:</strong> {selectedThanks.memberName}</p>
                      <p><strong>Message:</strong> {selectedThanks.message}</p>
                      <p><strong>Amount:</strong> GHS {selectedThanks.amount}</p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(selectedThanks.dateOfThanksgiving).toLocaleDateString("en-GB")}
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
                        if (!selectedThanks?._id) {
                          alert("Missing ID. Cannot delete.");
                          return;
                        }

                        const confirmed = window.confirm("Are you sure you want to delete this record?");
                        if (confirmed) {
                          try {
                            await deleteThanksgiving(selectedThanks._id);
                            alert("Deleted successfully!");
                            closeModal();
                            fetchThanksgivings();
                          } catch (error) {
                            console.error("Failed to delete:", error);
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
    </div>
  );
}
