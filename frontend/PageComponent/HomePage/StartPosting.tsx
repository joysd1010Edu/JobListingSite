//=== Imports ===
import React from "react";
import Image from "next/image";
import Link from "next/link";

//=== Start Posting Section Component ===
const StartPosting = () => {
  return (
    <section className="relative bg-[#4640DE] overflow-hidden">
      {/* === Decorative Triangle (Top-Left Corner) === */}
      <div
        className="absolute top-0 left-0 w-0 h-0"
        style={{
          borderLeft: "200px solid #3B35C4",
          borderBottom: "200px solid transparent",
        }}
      />

      {/* === Larger Triangle for Desktop === */}
      <div
        className="absolute top-0 left-0 w-0 h-0 hidden lg:block"
        style={{
          borderLeft: "320px solid #3B35C4",
          borderBottom: "320px solid transparent",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* === Text Content === */}
          <div className="flex-1 z-10 text-center lg:text-left">
            {/* === Section Heading === */}
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white leading-tight">
              Start posting
              <br />
              jobs today
            </h2>

            {/* === Section Description === */}
            <p className="mt-4 text-white/80 text-base sm:text-lg">
              Start posting jobs for only $10.
            </p>

            {/* === CTA Button === */}
            <Link
              href="/signup"
              className="inline-block mt-8 px-8 py-4 border-2 border-white text-white font-bold text-base hover:bg-white hover:text-[#4640DE] transition-colors"
            >
              Sign Up For Free
            </Link>
          </div>

          {/* === Dashboard Preview Image === */}
          <div className="flex-1 z-10">
            <Image
              src="/Images/dashboard.png"
              alt="QuickHire Dashboard Preview"
              width={600}
              height={420}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartPosting;
