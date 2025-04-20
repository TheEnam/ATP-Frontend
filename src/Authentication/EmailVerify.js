import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../api/auth/verifyEmail";

const EmailVerify = () => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("Verifying...");
  const [manualEntry, setManualEntry] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlToken = queryParams.get("token");

    if (urlToken) {
      handleVerify(urlToken);
    } else {
      setMessage("Invalid or missing token. Please enter your token manually.");
      setManualEntry(true);
    }
  }, [location]);

  const handleVerify = async (t) => {
    setMessage("Verifying...");
    try {
      const result = await verifyEmail(t);
      console.log("Verification result:", result);
      setMessage("Email verified successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      console.error("Verification failed:", err);
      setMessage("Verification failed. Invalid or expired token.");
      setManualEntry(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token.trim()) {
      handleVerify(token.trim());
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow text-center w-full max-w-md">
        <h2 className="text-lg font-semibold mb-3">Email Verification</h2>
        <p className="mb-4 text-gray-700">{message}</p>

        {manualEntry && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full p-2 border rounded mb-3"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
            >
              Verify Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailVerify;
