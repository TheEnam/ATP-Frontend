import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/auth/resetPassword";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await resetPassword({ token, password });
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setMessage("Failed to reset password. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or expired reset link.");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        {message && (
          <p className="text-center text-sm mb-3 text-gray-500">{message}</p>
        )}

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          className="w-full p-2 border rounded mb-3"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          className="w-full p-2 border rounded mb-3"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
