"use client";

//=== Imports ===
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/SharedComponents/Providers/AuthProvider";
import { toast } from "sonner";

//=== Signup Page Component ===
const Signup = () => {
  //=== Form State ===
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  //=== Auth Hook ===
  const { signup, isLoading } = useAuth();

  //=== Handle Form Submit ===
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    //=== Validation ===
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    try {
      await signup(name, email, password);
      toast.success("Account created successfully! Redirecting...");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Signup failed. Please try again.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <section className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gradient-to-b from-[#F8F8FD] to-white px-4 py-12 page-transition">
      <div className="w-full max-w-[480px]">
        {/* === Signup Card === */}
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(70,64,222,0.06)] border border-[#D6DDEB]/50 p-8 animate-fade-in-up">
          {/* === Header === */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4640DE] to-[#6C63FF] rounded-2xl flex items-center justify-center shadow-lg shadow-[#4640DE]/20 hover:scale-105 transition-transform duration-300">
                <Image
                  src="/Images/logo.png"
                  alt="QuickHire"
                  width={32}
                  height={32}
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#25324B]">
              Get Started Now
            </h1>
            <p className="text-[#7C8493] text-sm mt-1">
              Create your QuickHire account
            </p>
          </div>

          {/* === Error Message === */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm animate-scale-in">
              {error}
            </div>
          )}

          {/* === Signup Form === */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* === Full Name Field === */}
            <div>
              <label className="block text-sm font-semibold text-[#25324B] mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm transition-all duration-200"
              />
            </div>

            {/* === Email Field === */}
            <div>
              <label className="block text-sm font-semibold text-[#25324B] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm transition-all duration-200"
              />
            </div>

            {/* === Password Field === */}
            <div>
              <label className="block text-sm font-semibold text-[#25324B] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm pr-12 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7C8493] hover:text-[#25324B] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* === Confirm Password Field === */}
            <div>
              <label className="block text-sm font-semibold text-[#25324B] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm pr-12 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7C8493] hover:text-[#25324B] transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* === Submit Button === */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4640DE] text-white py-3.5 font-bold text-base rounded-xl hover:bg-[#3530C9] hover:shadow-lg hover:shadow-[#4640DE]/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* === Login Link === */}
          <p className="text-center text-sm text-[#7C8493] mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#4640DE] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
