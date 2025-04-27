import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { forgotPassword } from "../api/auth/forgotPassword"; 

const ForgotPassword = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialEmail = queryParams.get("email") || "";

    const [email, setEmail] = useState(initialEmail);

    useEffect(() => {
        const attemptedEmail = localStorage.getItem("attemptedEmail") || "";
        setEmail(attemptedEmail);
      }, []);
    const [message, setMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    const toggleEdit = () => {
        setIsEditing((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await forgotPassword(email);
            console.log("Response from forgot password API:", response);
            setMessage("Password reset link sent. Please check your inbox.");
            localStorage.removeItem("attemptedEmail");
        } catch (err) {
            setMessage(err.response?.data?.message || "Something went wrong");
            console.error("Error sending password reset link:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

                <p className="text-sm mb-3 text-gray-500">
                    We will send a security code to the email address, please make sure it is correct.
                </p>

                {!isEditing ? (
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-md text-gray-800">{email}</span>
                        <button
                            type="button"
                            onClick={toggleEdit}
                            className="text-blue-600 text-sm hover:underline"
                        >
                            Edit
                        </button>
                    </div>
                ) : (
                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                )}

                {message && (
                    <p className="text-center text-sm mb-3 text-gray-500">{message}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
