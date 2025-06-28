import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { getAllProgrammes } from "../../api/programmes/getProg";
import { updateProgramme } from "../../api/programmes/editProg";
import { deleteProgramme } from "../../api/programmes/delProg";

export default function Programmes() {
  const navigate = useNavigate();
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const fetchProgrammes = async () => {
    setLoading(true);
    try {
      const data = await getAllProgrammes();
      setProgrammes(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgrammes();
  }, []);

  const handleUpdate = async () => {
    try {
      const updated = {
        title: selectedProgramme.title,
        department: selectedProgramme.department,
        description: selectedProgramme.description,
        date: selectedProgramme.date,
      };
      await updateProgramme(selectedProgramme._id, updated);
      alert("Programme updated");
      setEditMode(false);
      setSelectedProgramme(null);
      fetchProgrammes();
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this programme?");
    if (!confirm) return;

    try {
      await deleteProgramme(selectedProgramme._id);
      alert("Programme deleted");
      setSelectedProgramme(null);
      fetchProgrammes();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center  mb-6 w-full max-w-4xl">
        <h1 className="text-2xl font-semibold">Programmes</h1>
        <button
          onClick={() => navigate("/create-programme")}
          className="flex items-center gap-2 bg-gray-100 text-black px-4 py-2 rounded-lg hover:bg-gray-500 transition"
        >
          <FaPlus /> Add Programme
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl mb-8">
        <div className="flex font-semibold text-gray-700 border-b pb-2 mb-2">
          <p className="flex-1">Title</p>
          <p className="flex-1">Department</p>
          <p className="flex-1">Date</p>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          programmes.map((programme) => (
            <div
              key={programme._id}
              className="flex items-center p-4 border-b hover:bg-gray-100 transition cursor-pointer"
              onClick={() => {
                setSelectedProgramme({ ...programme });
                setEditMode(false);
              }}
            >
              <p className="flex-1">{programme.title}</p>
              <p className="flex-1">{programme.department}</p>
              <p className="flex-1">{new Date(programme.date).toLocaleDateString("en-GB")}</p>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selectedProgramme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-md">

            <button
              onClick={() => setSelectedProgramme(null)}
              className="absolute top-2 right-3 text-2xl font-bold text-gray-700 hover:text-red-500"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Edit Programme" : "Programme Details"}
            </h2>

            {editMode ? (
              <>

                <label className="text-gray-800 font-semibold mb-1">Title</label>
                <input
                  className="w-full p-2 border rounded mb-2"
                  value={selectedProgramme.title}
                  onChange={(e) =>
                    setSelectedProgramme({ ...selectedProgramme, title: e.target.value })
                  }
                />

                <label className="text-gray-800 font-semibold mb-1">Description</label>
                <textarea
                  className="w-full p-2 border rounded mb-2"
                  value={selectedProgramme.description}
                  onChange={(e) =>
                    setSelectedProgramme({ ...selectedProgramme, description: e.target.value })
                  }
                />

                <label className="text-gray-800 font-semibold mb-1">Department</label>
                <input
                  className="w-full p-2 border rounded mb-2"
                  value={selectedProgramme.department}
                  onChange={(e) =>
                    setSelectedProgramme({ ...selectedProgramme, department: e.target.value })
                  }
                />

                <label className="text-gray-800 font-bold mb-1">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded mb-2"
                  value={selectedProgramme.date?.slice(0, 10)}
                  onChange={(e) =>
                    setSelectedProgramme({ ...selectedProgramme, date: e.target.value })
                  }
                />

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={handleUpdate}
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
                <p><strong>Title:</strong> {selectedProgramme.title}</p>
                <p><strong>Department:</strong> {selectedProgramme.department}</p>
                <p><strong>Description:</strong> {selectedProgramme.description}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedProgramme.date).toLocaleDateString("en-GB")}
                </p>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/quarterly-programmes")}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-black mt-4 flex items-center gap-2"
        >
          📄 Generate Quarterly Programmes
        </button>
      </div>
    </div>
  );
}
