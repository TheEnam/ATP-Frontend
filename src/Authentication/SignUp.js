import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup data:", form);
    // Akua TODO: send to backend (POST /signup)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded mb-3"
          required
        />

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

        <button onClick={() => navigate("/login")}  
          type="submit"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Create Account
        </button>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
