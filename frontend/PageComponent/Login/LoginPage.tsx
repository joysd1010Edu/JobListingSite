"use client";

//=== Imports ===
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Copy, Check } from "lucide-react";
import { useAuth } from "@/SharedComponents/Providers/AuthProvider";
import { toast } from "sonner";

//=== Test Credentials Data ===
const testCredentials = [
  { label: "Admin", email: "admin@quickhire.com", password: "admin123" },
  { label: "User", email: "user@quickhire.com", password: "user123" },
];

//=== Login Page Component ===
const LoginPage = () => {
  //=== Form State ===
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [copiedField, setCopiedField] = useState("");

  //=== Auth Hook ===
  const { login, isLoading } = useAuth();

  //=== Handle Form Submit ===
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await login(email, password);
      toast.success("Login successful! Redirecting...");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(message);
      toast.error(message);
    }
  };

  //=== Copy to Clipboard Handler ===
  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedField(""), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  //=== Auto-fill Credentials ===
  const handleAutoFill = (cEmail: string, cPassword: string) => {
    setEmail(cEmail);
    setPassword(cPassword);
    setError("");
    toast.info("Credentials auto-filled!");
  };

  return (
    <section className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gradient-to-b from-[#F8F8FD] to-white px-4 py-12 page-transition">
      <div className="w-full max-w-[480px]">
        {/* === Login Card === */}
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
            <h1 className="text-2xl font-bold text-[#25324B]">Welcome Back</h1>
            <p className="text-[#7C8493] text-sm mt-1">
              Log in to your QuickHire account
            </p>
          </div>

          {/* === Error Message === */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm animate-scale-in">
              {error}
            </div>
          )}

          {/* === Login Form === */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                  placeholder="Enter your password"
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

            {/* === Submit Button === */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4640DE] text-white py-3.5 font-bold text-base rounded-xl hover:bg-[#3530C9] hover:shadow-lg hover:shadow-[#4640DE]/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* === Sign Up Link === */}
          <p className="text-center text-sm text-[#7C8493] mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#4640DE] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* === Test Credentials Panel === */}
        <div
          className="mt-6 bg-white rounded-2xl shadow-[0_8px_40px_rgba(70,64,222,0.06)] border border-[#D6DDEB]/50 p-6 animate-fade-in-up animation-delay-200 animate-stagger"
          style={{ animationFillMode: "forwards" }}
        >
          <h3 className="text-sm font-bold text-[#25324B] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#56CDAD] rounded-full animate-pulse-soft" />
            Test Credentials
          </h3>

          <div className="flex flex-col gap-4">
            {testCredentials.map((cred) => (
              <div
                key={cred.label}
                className="bg-gradient-to-r from-[#F8F8FD] to-[#F0EFFF]/30 border border-[#D6DDEB]/80 rounded-xl p-4 hover:border-[#4640DE]/30 transition-all duration-300"
              >
                {/* === Credential Label & Auto-fill Button === */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#4640DE] uppercase tracking-wide">
                    {cred.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAutoFill(cred.email, cred.password)}
                    className="text-xs font-semibold text-[#4640DE] hover:underline hover:text-[#3530C9] transition-colors"
                  >
                    Use this
                  </button>
                </div>

                {/* === Email Row === */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs text-[#515B6F] font-mono truncate">
                    {cred.email}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(cred.email, `${cred.label}-email`)
                    }
                    className="flex-shrink-0 text-[#7C8493] hover:text-[#4640DE] transition-colors"
                  >
                    {copiedField === `${cred.label}-email` ? (
                      <Check size={14} className="text-[#56CDAD]" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>

                {/* === Password Row === */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[#515B6F] font-mono">
                    {cred.password}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(cred.password, `${cred.label}-pass`)
                    }
                    className="flex-shrink-0 text-[#7C8493] hover:text-[#4640DE] transition-colors"
                  >
                    {copiedField === `${cred.label}-pass` ? (
                      <Check size={14} className="text-[#56CDAD]" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
