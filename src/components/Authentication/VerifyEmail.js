import React from "react";

export default function VerifyEmail({ email }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-3">Verify Your Email</h2>
        <p className="text-gray-700 mb-4">
          A verification link has been sent to <strong>{email}</strong>. <br />
          Please check your inbox and click the link to activate your account.
        </p>
        <button className="text-blue-600 hover:underline">
          Resend Verification Email
        </button>
      </div>
    </div>
  );
}
