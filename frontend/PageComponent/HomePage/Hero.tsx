//=== Imports ===
import React from "react";
import Image from "next/image";
import { Search, MapPin, ChevronDown } from "lucide-react";

//=== Hero Section Component ===
const Hero = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* === Geometric Background Decorations === */}
      <div className="absolute top-10 right-0 lg:right-[5%] w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[520px] lg:h-[520px] pointer-events-none">
        {/* === Outer Rectangle === */}
        <div className="absolute inset-0 border-[1.5px] border-[#CECDFF] rounded-2xl transform rotate-[14deg] opacity-50" />
        {/* === Middle Rectangle === */}
        <div className="absolute inset-6 lg:inset-10 border-[1.5px] border-[#CECDFF] rounded-2xl transform -rotate-[8deg] opacity-35" />
        {/* === Inner Rectangle === */}
        <div className="absolute inset-12 lg:inset-20 border-[1.5px] border-[#E0DAFF] rounded-2xl transform rotate-[4deg] opacity-25" />
      </div>

      <div className="site-container py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* === Hero Text Content === */}
          <div className="flex-1 z-10 w-full lg:w-auto animate-fade-in-up">
            {/* === Main Heading === */}
            <h1 className="text-[38px] sm:text-[52px] lg:text-[64px] font-bold text-[#25324B] leading-[1.1] tracking-tight">
              Discover
              <br />
              more than
              <br />
              <span className="text-[#26A4FF] relative inline-block">
                5000+ Jobs
                {/* === Scribble Underline Decoration === */}
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-[16px] sm:h-[20px]"
                  viewBox="0 0 360 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  {/* === Wave Line 1 === */}
                  <path
                    d="M2 8C40 3 80 5 120 7C160 9 200 3 240 5C280 7 320 3 358 6"
                    stroke="#26A4FF"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* === Wave Line 2 === */}
                  <path
                    d="M2 12C40 7 80 9 120 11C160 13 200 7 240 9C280 11 320 7 358 10"
                    stroke="#26A4FF"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* === Wave Line 3 === */}
                  <path
                    d="M2 16C40 11 80 13 120 15C160 17 200 11 240 13C280 15 320 11 358 14"
                    stroke="#26A4FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* === Arrow Tip === */}
                  <path
                    d="M332 1L358 6L338 13"
                    stroke="#26A4FF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </h1>

            {/* === Subtitle Description === */}
            <p className="mt-6 text-base sm:text-lg text-[#515B6F] max-w-[520px] leading-relaxed">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            {/* === Search Bar Container === */}
            <div className="mt-8 bg-white rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-4 max-w-[680px]">
              <div className="flex flex-col md:flex-row items-stretch gap-4">
                {/* === Job Title Input Field === */}
                <div className="flex items-center gap-3 flex-1 border-b md:border-b-0 md:border-r border-[#E4E5E7] pb-4 md:pb-0 md:pr-4">
                  <Search
                    size={22}
                    className="text-[#25324B] flex-shrink-0"
                    strokeWidth={2.5}
                  />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="w-full outline-none text-[#25324B] placeholder:text-[#A8ADB7] text-base bg-transparent"
                  />
                </div>

                {/* === Location Select Field === */}
                <div className="flex items-center gap-3 flex-1 pb-4 md:pb-0 md:pr-4">
                  <MapPin
                    size={22}
                    className="text-[#25324B] flex-shrink-0"
                    strokeWidth={2.5}
                  />
                  <div className="flex items-center justify-between w-full cursor-pointer">
                    <span className="text-[#25324B] text-base">
                      Florence, Italy
                    </span>
                    <ChevronDown size={16} className="text-[#515B6F]" />
                  </div>
                </div>

                {/* === Search Button === */}
                <button className="bg-[#4640DE] text-white px-8 py-4 font-bold text-base hover:bg-[#3530C9] transition-colors whitespace-nowrap flex-shrink-0">
                  Search my job
                </button>
              </div>
            </div>

            {/* === Popular Search Tags === */}
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-[#515B6F] text-sm">Popular :</span>
              <span className="text-[#25324B] text-sm font-medium">
                UI Designer, UX Researcher, Android, Admin
              </span>
            </div>
          </div>

          {/* === Hero Person Image (Desktop Only) === */}
          <div className="hidden lg:flex flex-1 justify-end relative z-10 animate-slide-in-right">
            <Image
              src="/Images/person.png"
              alt="Job seeker pointing"
              width={500}
              height={580}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
