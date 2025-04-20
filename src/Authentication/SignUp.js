import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth/register";
import { GoEye, GoEyeClosed } from "react-icons/go";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6 || form.confirmPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const result = await register(form);
      alert("Signup successful!");
      console.log("Signup success:", result);
      navigate("/verify-email", {
        state: { email: form.email },
      });
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
    }
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

        <div className="relative mb-3">
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border rounded pr-10"
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
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full p-2 border rounded pr-10"
            required
          />
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-2 cursor-pointer"
          >
            {showConfirm ? <GoEyeClosed size={18} /> : <GoEye size={18} />}
          </span>
        </div>

        {
          form.password !== form.confirmPassword && (
            <p className="text-red-500 text-sm place-self-center mb-3">
              Passwords do not match
            </p>
          )
        }

        {error && <p className="text-red-500 text-sm place-self-center mb-3">{error}</p>}

        <button
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
