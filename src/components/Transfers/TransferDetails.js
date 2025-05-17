import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const mockTransferData = [
  {
    id: 1,
    name: "Bernd Obeng",
    type: "Transfer In",
    status: "Approved",
    details: {
      dob: "1990-01-01",
      baptismDate: "2005-06-10",
      pastor: "Pastor Kofi",
      parents: "John & Ama Obeng",
      fromChurch: "Adenta SDA",
      fromDistrict: "Adenta District",
    },
  },
  {
    id: 2,
    name: "Enam Avemegah",
    type: "Transfer Out",
    status: "1st Reading",
    details: {
      dob: "1995-03-15",
      baptismDate: "2010-07-21",
      pastor: "Pastor Mensah",
      parents: "Kwame & Esi Avemegah",
      toChurch: "Tema SDA",
      toDistrict: "Tema District",
    },
  },
];

const statusProgression = {
  "1st Reading": "2nd Reading",
  "2nd Reading": "Approved",
  Approved: "Approved",
};

export default function TransferDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transfer, setTransfer] = useState(() =>
    mockTransferData.find((t) => t.id === parseInt(id))
  );

  const handleAdvanceStatus = () => {
    const nextStatus = statusProgression[transfer.status];
    if (transfer.status !== nextStatus) {
      setTransfer((prev) => ({ ...prev, status: nextStatus }));
      // TODO: send update to backend if connected
    }
  };

  if (!transfer) return <p>Transfer not found.</p>;

  const { name, type, status, details } = transfer;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">{name}</h2>
        <p><strong>Transfer Type:</strong> {type}</p>
        <p><strong>Status:</strong> {status}</p>

        {status !== "Approved" && (
          <button
            onClick={handleAdvanceStatus}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Advance to Next
          </button>
        )}

        <hr className="my-6" />
        <h3 className="text-lg font-semibold mb-2">Transfer Details</h3>
        <ul className="space-y-2">
          {Object.entries(details).map(([key, value]) => (
            <li key={key}>
              <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}
            </li>
          ))}
        </ul>

        <button onClick={() => navigate(-1)} className="mt-6 text-gray-500 underline">
          ⬅ Back to Transfers
        </button>
      </div>
    </div>
  );
}
