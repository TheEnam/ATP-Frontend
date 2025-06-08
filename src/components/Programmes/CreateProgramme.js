import React  from "react";
import { useNavigate } from "react-router-dom";


export default function CreateProgramme () {
  const navigate = useNavigate();
  
  const handleCreate = async () => {
    // await createTransfer(form);
    // alert("Transfer created!");
  }
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
            Create Programme
          </h2>
          <form id="add-program" onSubmit={handleCreate}>
            <label className="block text-gray-700 font-medium">Programme Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-2 mt-1 border rounded bg-white text-gray-700"
            />
            <label className="block text-gray-700 font-medium mt-3">Description</label>
            <textarea
              name="description"
              rows="4"
              className="w-full p-2 mt-1 border rounded bg-white text-gray-700"
            ></textarea>
            <label className="block text-gray-700 font-medium mt-3">Department</label>
            <input
              type="text"
              name="department"
              required
              className="w-full p-2 mt-1 border rounded bg-white text-gray-700" 
            />
            <label className="block text-gray-700 font-medium mt-3">Date</label>
            <input
              type="date"
              name="date"
              required
              className="w-full p-2 mt-1 border rounded bg-white text-gray-700"
            />
            <button onClick={ () => navigate("/programmes")}
              type="submit"
              className="w-full mt-4 py-2 border border-black rounded-lg bg-transparent text-black font-bold hover:bg-black hover:text-white transition duration-200"
            >
              Create Programme
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}