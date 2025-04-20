import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/auth/resetPassword";
import { GoEye, GoEyeClosed } from "react-icons/go";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("code");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setLoading(false);
            return;
        }

        if (password.length < 6 || confirmPassword.length < 6) {
            setMessage("Password must be at least 6 characters long.");
            setLoading(false);
            return;
        }


        try {
            const response = await resetPassword({
                password,
                verificationCode: token,
            });
            console.log("Response from reset password API:", response);
            setMessage("Password reset successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 3000);
        } catch (error) {
            console.error("Error resetting password:", error);
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

                <div className="relative mb-3">
                    <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                    className="w-full p-2 border rounded mb-3"
                    required
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2 cursor-pointer"
                    >
                    {showPassword ? <GoEyeClosed size={18} /> : <GoEye size={18} />}
                    </span>
                </div>

                <div className="relative mb-3">
                    <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full p-2 border rounded mb-3"
                    required
                    />
                    <span
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-2 cursor-pointer"
                    >
                    {showConfirm ? <GoEyeClosed size={18} /> : <GoEye size={18} />}
                    </span>
                </div>

                {message && (
                <p className="text-center text-sm mb-3 text-gray-500">{message}</p>
                )}

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
