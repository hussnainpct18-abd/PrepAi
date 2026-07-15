import React, { useState } from "react";
import "../style/button.css";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import PageTransitionLoader from "./Transition.jsx";

const Register = () => {
  const navigate = useNavigate();

  const { user, loading, handleLogin, handleLogout, handleRegister } =
    useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.trim().length < 3) {
      newErrors.username = "Must be at least 3 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const clearFieldError = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      triggerShake();
      return;
    }

    setSubmitting(true);
    const result = await handleRegister({ username, email, password });
    setSubmitting(false);

    if (result) {
      navigate("/home");
    } else {
      triggerShake();
    }
  };

  if (loading) {
    return (
      <PageTransitionLoader></PageTransitionLoader>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0d0d0f] text-white px-4 py-10 overflow-hidden">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 4px 24px #e0485a33; }
          50% { box-shadow: 0 4px 32px #e0485a55; }
        }
        .card-enter {
          animation: fadeSlideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .field-enter {
          animation: fadeSlideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .shake-anim {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        .error-enter {
          animation: fadeIn 0.25s ease both;
        }
        .btn-glow:hover {
          animation: glowPulse 1.4s ease-in-out infinite;
        }
      `}</style>

      <div
        className={`card-enter w-full max-w-md p-8 bg-[#13131a] rounded-2xl shadow-xl flex flex-col gap-6 transition-transform ${
          shake ? "shake-anim" : ""
        }`}
      >
        <div className="text-center field-enter pt-4" style={{ animationDelay: "0.05s" }}>
          <div className="nav-logo" >
                Prep<span>AI</span>
            </div>
          <h2 className=" font-bold font-['Sora',sans-serif] text-white">
            Create an Account
          </h2>
          <p className="text-[#7e7e94] text-sm mt-2">Join us to get started</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 p-4">
          <div
            className="flex flex-col gap-1.5 field-enter"
            style={{ animationDelay: "0.1s" }}
          >
            <label htmlFor="username" className="text-[13px] font-semibold text-[#e2e2e8]">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                clearFieldError("username");
              }}
              type="text"
              id="username"
              placeholder="username"
              className={`bg-[#0d0d0f] border rounded-lg p-3 text-sm text-[#e2e2e8] placeholder:text-[#3e3e52] outline-none transition-all duration-200 focus:scale-[1.01] ${
                errors.username
                  ? "border-[#e0485a]"
                  : "border-[#1e1e2e] focus:border-[#e0485a44]"
              }`}
            />
            {errors.username && (
              <span className="error-enter text-[#ff8a97] text-xs">
                {errors.username}
              </span>
            )}
          </div>

          <div
            className="flex flex-col gap-1.5 field-enter"
            style={{ animationDelay: "0.15s" }}
          >
            <label htmlFor="email" className="text-[13px] font-semibold text-[#e2e2e8]">
              Email address
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
              type="email"
              id="email"
              placeholder="Email"
              className={`bg-[#0d0d0f] border rounded-lg p-3 text-sm text-[#e2e2e8] placeholder:text-[#3e3e52] outline-none transition-all duration-200 focus:scale-[1.01] ${
                errors.email
                  ? "border-[#e0485a]"
                  : "border-[#1e1e2e] focus:border-[#e0485a44]"
              }`}
            />
            {errors.email && (
              <span className="error-enter text-[#ff8a97] text-xs">
                {errors.email}
              </span>
            )}
          </div>

          <div
            className="flex flex-col gap-1.5 field-enter"
            style={{ animationDelay: "0.2s" }}
          >
            <label htmlFor="password" className="text-[13px] font-semibold text-[#e2e2e8]">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearFieldError("password");
              }}
              type="password"
              id="password"
              placeholder="password"
              className={`bg-[#0d0d0f] border rounded-lg p-3 text-sm text-[#e2e2e8] placeholder:text-[#3e3e52] outline-none transition-all duration-200 focus:scale-[1.01] ${
                errors.password
                  ? "border-[#e0485a]"
                  : "border-[#1e1e2e] focus:border-[#e0485a44]"
              }`}
            />
            {errors.password && (
              <span className="error-enter text-[#ff8a97] text-xs">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-glow field-enter mt-2 rounded bg-gradient-to-br from-[#e0485a] to-[#b83048] hover:opacity-90 disabled:opacity-60 text-white font-semibold py-3 rounded-full transition-all duration-200 text-sm shadow-[0_4px_24px_#e0485a33] hover:scale-[1.02] active:scale-[0.98]"
            style={{ animationDelay: "0.25s" }}
          >
            {submitting ? "Creating account..." : "Submit"}
          </button>
        </form>

        <p
          className="text-center text-sm text-[#7e7e94] field-enter"
          style={{ animationDelay: "0.3s" }}
        >
          Already have an account?{" "}
          <Link to={"/Login"} className=" hover:underline font-medium" style={{color:"#e0485a"}}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;