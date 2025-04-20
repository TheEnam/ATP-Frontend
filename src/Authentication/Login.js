import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth"; // or ../api/auth/login
import { GoEye, GoEyeClosed } from "react-icons/go";


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting login with:", form);
    try {
      const result = await login(form);
      console.log("Login success:", result);
      // Save token and redirect
      localStorage.setItem("token", result.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed response:", err?.response?.data || err);
      setError("Login failed. Check your credentials.");
      console.error(err);
    }
  };
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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


        <div>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-3"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-16 text-gray-500"
          >
            {showPassword ? <GoEye /> : <GoEyeClosed />}
          </button>     
        </div>

        {error && <p className="text-red-500  place-self-center text-sm mb-3">{error}</p>}

        <button
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
