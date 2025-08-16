import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Mail, ArrowLeft, RefreshCw } from "lucide-react";
import bgImg from "../assets/LoginBackground.jpg";

const backendUrl = import.meta.env.VITE_API_URL;

const OtpInput = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    setError("");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const pastedOtp = text.replace(/\D/g, "").slice(0, 6).split("");
        const newOtp = [...otp];
        pastedOtp.forEach((digit, i) => {
          if (i < 6) newOtp[i] = digit;
        });
        setOtp(newOtp);
        if (pastedOtp.length > 0) {
          inputRefs.current[Math.min(pastedOtp.length - 1, 5)]?.focus();
        }
      });
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter a complete 6-digit OTP.");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      const activationToken = localStorage.getItem("activationToken");

      const response = await fetch(`${backendUrl}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activationToken}`,
        },
        body: JSON.stringify({ otp: otpString }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/authenticate");
        }, 1500);
      } else {
        const error = await response.json();
        setError(error.message || "Verification failed. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (success) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md w-full text-center transition-colors">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Verification Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Redirecting you to login...
          </p>
          <div className="mt-6 w-full bg-green-100 dark:bg-green-900 rounded-full h-2 overflow-hidden">
            <div
              className="bg-green-500 h-2 rounded-full animate-pulse"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md w-full transition-colors">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="absolute top-6 left-6 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </button>

        {/* Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gray-800 dark:bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Mail className="w-8 h-8 text-white dark:text-gray-900" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Verify Your Email
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            We've sent a 6-digit verification code to your email address.
            Please enter it below to continue.
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="mb-6">
          <div className="flex justify-center gap-3 mb-4">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                maxLength="1"
                className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl transition-all duration-200
                  ${digit
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                    : error
                      ? "border-red-300 bg-red-50 dark:bg-red-900"
                      : "border-gray-300 dark:border-gray-600 hover:border-blue-300 focus:border-blue-500"
                  } focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800`}
                disabled={isVerifying}
              />
            ))}
          </div>
          {error && (
            <div className="text-red-500 dark:text-red-300 text-sm text-center bg-red-50 dark:bg-red-900 p-3 rounded-lg border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerifyOtp}
          disabled={isVerifying || otp.join("").length !== 6}
          className="w-full font-semibold py-3 rounded-xl mb-4"
          color="#2563eb"
          motionProps={{
            initial: { opacity: 0, y: 10, scale: 0.97 },
            animate: { opacity: 1, y: 0, scale: 1 },
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
            whileHover: { scale: 1.04, y: -2 },
            whileTap: { scale: 0.96 }
          }}
        >
          {isVerifying ? (
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Verifying...
            </div>
          ) : (
            "Verify OTP"
          )}
        </Button>

        {/* Tip */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-blue-700 dark:text-blue-200 text-xs text-center">
            💡 <strong>Tip:</strong> You can paste the entire OTP at once using Ctrl+V
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
