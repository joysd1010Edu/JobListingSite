//=== Imports ===
import React from "react";
import Image from "next/image";

//=== Company Logo Data ===
const companies = [
  { name: "Vodafone", logo: "/Images/vodaphone.png" },
  { name: "Intel", logo: "/Images/intel.png" },
  { name: "Tesla", logo: "/Images/tesla.png" },
  { name: "AMD", logo: "/Images/amd.png" },
  { name: "Talkit", logo: "/Images/talkit.png" },
];

//=== Companies Strip Component ===
const CompaniesStrip = () => {
  return (
    <section className="py-10 lg:py-12 bg-white">
      <div className="site-container">
        {/* === Section Label === */}
        <p className="text-[#7C8493] text-base lg:text-lg mb-8">
          Companies we helped grow
        </p>

        {/* === Company Logos Grid === */}
        <div className="flex flex-wrap items-center gap-8 sm:gap-10 lg:gap-0 lg:justify-between">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
            >
              {/* === Company Logo Image === */}
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                width={120}
                height={36}
                className="object-contain h-7 lg:h-9 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesStrip;
