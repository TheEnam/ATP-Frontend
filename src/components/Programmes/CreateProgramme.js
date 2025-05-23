import React  from "react";

const handleCreate = async () => {
  // await createTransfer(form);
  // alert("Transfer created!");
}

export default function CreateProgramme () {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
            Create Programme
          </h2>
          <form onSubmit={handleCreate}>
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
              required
              className="w-full p-2 mt-1 border rounded bg-white text-gray-700"
            ></textarea>
            <button
              type="submit"
              className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Create Programme
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}