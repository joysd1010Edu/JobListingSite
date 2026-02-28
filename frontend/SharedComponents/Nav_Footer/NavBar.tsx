"use client";

//=== Imports ===
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/SharedComponents/Providers/AuthProvider";

//=== NavBar Component ===
const NavBar = () => {
  //=== Mobile Menu State ===
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  //=== Auth State ===
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-[#D6DDEB]/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="site-container">
        <div className="flex items-center justify-between h-18">
          {/* === Logo & Navigation Links === */}
          <div className="flex items-center gap-12">
            {/* === Logo === */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/Images/logo.png"
                alt="QuickHire Logo"
                width={200}
                height={32}
              />
              
            </Link>

            {/* === Desktop Navigation Links === */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/jobs"
                className="text-[#515B6F] hover:text-[#25324B] text-base font-medium transition-colors"
              >
                Find Jobs
              </Link>
            </div>
          </div>

          {/* === Desktop Auth Area === */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoading && isAuthenticated && user ? (
              <>
                {/* === Admin Link (if admin) === */}
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 text-[#4640DE] font-semibold text-sm hover:opacity-80 transition-opacity"
                  >
                    <Shield size={16} />
                    Admin
                  </Link>
                )}

                {/* === User Name === */}
                <span className="text-sm text-[#515B6F]">
                  Hi,{" "}
                  <span className="font-semibold text-[#25324B]">
                    {user.name}
                  </span>
                </span>

                <div className="w-px h-8 bg-[#D6DDEB]" />

                {/* === Logout Button === */}
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-[#7C8493] font-medium text-sm hover:text-red-500 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : !isLoading ? (
              <>
                <Link
                  href="/login"
                  className="text-[#4640DE] font-bold text-base hover:opacity-80 transition-opacity"
                >
                  Login
                </Link>
                <div className="w-px h-12 bg-[#D6DDEB]" />
                <Link
                  href="/signup"
                  className="bg-[#4640DE] text-white px-6 py-3 rounded-lg font-bold text-base hover:bg-[#3530C9] hover:shadow-lg hover:shadow-[#4640DE]/25 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            ) : null}
          </div>

          {/* === Mobile Menu Toggle Button === */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center border border-[#D6DDEB] rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X size={20} className="text-[#25324B]" />
            ) : (
              <Menu size={20} className="text-[#25324B]" />
            )}
          </button>
        </div>

        {/* === Mobile Dropdown Menu === */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-[#D6DDEB] animate-slide-down">
            <div className="flex flex-col gap-4 pt-4">
              {/* === Mobile Nav Links === */}
              <Link
                href="/jobs"
                className="text-[#515B6F] hover:text-[#25324B] font-medium text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find Jobs
              </Link>
              <Link
                href="/browse-companies"
                className="text-[#515B6F] hover:text-[#25324B] font-medium text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Companies
              </Link>

              {/* === Mobile Auth Section === */}
              <div className="border-t border-[#D6DDEB] pt-4 flex flex-col gap-3">
                {!isLoading && isAuthenticated && user ? (
                  <>
                    {/* === User Info === */}
                    <span className="text-sm text-[#515B6F]">
                      Signed in as{" "}
                      <span className="font-semibold text-[#25324B]">
                        {user.name}
                      </span>
                    </span>

                    {/* === Admin Link (if admin) === */}
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-1.5 text-[#4640DE] font-semibold text-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Shield size={16} />
                        Admin Dashboard
                      </Link>
                    )}

                    {/* === Logout === */}
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-1.5 text-[#7C8493] font-medium text-sm hover:text-red-500"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </>
                ) : !isLoading ? (
                  <>
                    <Link
                      href="/login"
                      className="text-[#4640DE] font-bold text-base"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-[#4640DE] text-white px-6 py-3 font-bold text-base text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
