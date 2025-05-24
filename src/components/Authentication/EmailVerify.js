import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../api/auth/verifyEmail";

const EmailVerify = () => {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("Verifying...");
  const [manualEntry, setManualEntry] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);

  const handleVerify = React.useCallback(
    async (t) => {
      setMessage("Verifying...");
      try {
        const result = await verifyEmail(t);
        console.log("Verification result:", result);
        setMessage("Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        console.error("Verification failed:", err);
        setMessage("Verification failed. Invalid or expired token.");
        setManualEntry(true);
      }
    },
    [navigate]
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlToken = queryParams.get("token");

    if (urlToken) {
      handleVerify(urlToken);
    } else {
      setMessage("Please enter the code you received.");
      setManualEntry(true);
    }
  }, [location.search, handleVerify]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; 

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length === 4) {
      handleVerify(code);
    } else {
      setMessage("Please complete the 4-digit code.");
    }
  };

  return (
    <div className="flex justify-center items-center h-auto bg-gray-100">
      <div className="bg-white p-6 rounded shadow text-center w-full max-w-md">
        <h2 className="text-lg font-semibold mb-3">Email Verification</h2>
        <p className="mb-4 text-gray-700">{message}</p>

        {manualEntry && (
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-3 mb-4">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-12 text-center border rounded text-lg"
                  required
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
            >
              Verify Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailVerify;
