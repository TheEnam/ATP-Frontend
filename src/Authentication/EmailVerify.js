import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../api/auth/verifyEmail";

const EmailVerify = () => {
  const [message, setMessage] = useState("Verifying...");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    const handleVerify = async () => {
      try {
        const result = await verifyEmail(token);
        console.log("Verification result:", result);
        // if (result.error) {
        //   setMessage(result.error);
        //   return;
        // }
        setMessage("Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        console.error("Verification failed:", err);
        setMessage("Verification failed. The link may have expired or is invalid.");
      }
    };

    if (token) {
      handleVerify();
    } else {
      setMessage("Invalid verification link.");
    }
  }, [location, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-lg font-semibold">{message}</h2>
      </div>
    </div>
  );
};

export default EmailVerify;
