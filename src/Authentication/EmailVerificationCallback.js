import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "../axiosInstance";

export default function EmailVerificationCallback() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("Invalid verification link.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await axios.post("/auth/verify-email", { token });
        setStatus("Email verified! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        console.error(err);
        setStatus("Verification failed. Your link may have expired.");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md text-center max-w-md">
        <h2 className="text-xl font-bold mb-2">Email Verification</h2>
        <p>{status}</p>
      </div>
    </div>
  );
}
