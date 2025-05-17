import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Welcome to LESCetariat</h1>
        <p className="text-gray-600 mb-6">Please log in or sign up to continue.</p>
        
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="border border-black text-black px-4 py-2 rounded hover:bg-gray-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
