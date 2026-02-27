"use client";

//=== Imports ===
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

//=== NavBar Component ===
const NavBar = () => {
  //=== Mobile Menu State ===
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* === Logo & Navigation Links === */}
          <div className="flex items-center gap-12">
            {/* === Logo === */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/Images/logo.png"
                alt="QuickHire Logo"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold text-[#25324B]">
                QuickHire
              </span>
            </Link>

            {/* === Desktop Navigation Links === */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/find-jobs"
                className="text-[#515B6F] hover:text-[#25324B] text-base font-medium transition-colors"
              >
                Find Jobs
              </Link>
              <Link
                href="/browse-companies"
                className="text-[#515B6F] hover:text-[#25324B] text-base font-medium transition-colors"
              >
                Browse Companies
              </Link>
            </div>
          </div>

          {/* === Desktop Auth Buttons === */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-[#4640DE] font-bold text-base hover:opacity-80 transition-opacity"
            >
              Login
            </Link>
            <div className="w-px h-12 bg-[#D6DDEB]" />
            <Link
              href="/signup"
              className="bg-[#4640DE] text-white px-6 py-3 font-bold text-base hover:bg-[#3530C9] transition-colors"
            >
              Sign Up
            </Link>
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
          <div className="md:hidden pb-4 border-t border-[#D6DDEB]">
            <div className="flex flex-col gap-4 pt-4">
              {/* === Mobile Nav Links === */}
              <Link
                href="/find-jobs"
                className="text-[#515B6F] hover:text-[#25324B] font-medium text-base"
              >
                Find Jobs
              </Link>
              <Link
                href="/browse-companies"
                className="text-[#515B6F] hover:text-[#25324B] font-medium text-base"
              >
                Browse Companies
              </Link>

              {/* === Mobile Auth Buttons === */}
              <div className="border-t border-[#D6DDEB] pt-4 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="text-[#4640DE] font-bold text-base"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-[#4640DE] text-white px-6 py-3 font-bold text-base text-center"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
