import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login data:", form);
    // Akua TODO: send to backend (POST /login)
    navigate("/dashboard"); // I have to move this inside the async logic later when backend responds
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          required
        />

        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          required
        />

        <button onClick={() => navigate("/dashboard")}
          type="submit"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Log In
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
