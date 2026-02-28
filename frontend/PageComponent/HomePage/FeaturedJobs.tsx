//=== Imports ===
import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

//=== Tag Color Configuration ===
const tagStyles: Record<string, string> = {
  Marketing: "text-[#FFB836] border-[#FFE0A0] bg-[#FFF6E5]",
  Design: "text-[#56CDAD] border-[#A3E6D0] bg-[#E7F6F2]",
  Business: "text-[#4640DE] border-[#B8B6FF] bg-[#F0EFFF]",
  Technology: "text-[#FF6550] border-[#FFB5AB] bg-[#FFEAE6]",
};

//=== Company Logo Placeholder Colors ===
const logoColors: Record<string, { bg: string; text: string }> = {
  Revolut: { bg: "#1A1A2E", text: "#FFFFFF" },
  Dropbox: { bg: "#0061FF", text: "#FFFFFF" },
  Pitch: { bg: "#1C1C1C", text: "#FFFFFF" },
  Blinklist: { bg: "#2ECE6D", text: "#FFFFFF" },
  ClassPass: { bg: "#5B5FC7", text: "#FFFFFF" },
  Canva: { bg: "#00C4CC", text: "#FFFFFF" },
  GoDaddy: { bg: "#1BDBDB", text: "#FFFFFF" },
  Twitter: { bg: "#1DA1F2", text: "#FFFFFF" },
};

//=== Featured Jobs Data ===
const featuredJobs = [
  {
    id: 1,
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    description: "Revolut is looking for Email Marketing to help team ma ...",
    type: "Full Time",
    tags: ["Marketing", "Design"],
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, US",
    description: "Dropbox is looking for Brand Designer to help the team t ...",
    type: "Full Time",
    tags: ["Design", "Business"],
  },
  {
    id: 3,
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    description:
      "Pitch is looking for Customer Manager to join marketing t ...",
    type: "Full Time",
    tags: ["Marketing"],
  },
  {
    id: 4,
    title: "Visual Designer",
    company: "Blinklist",
    location: "Granada, Spain",
    description:
      "Blinklist is looking for Visual Designer to help team desi ...",
    type: "Full Time",
    tags: ["Design"],
  },
  {
    id: 5,
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    description: "ClassPass is looking for Product Designer to help us...",
    type: "Full Time",
    tags: ["Marketing", "Design"],
  },
  {
    id: 6,
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    description: "Canva is looking for Lead Engineer to help develop n ...",
    type: "Full Time",
    tags: ["Design", "Business"],
  },
  {
    id: 7,
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    description: "GoDaddy is looking for Brand Strategist to join the team...",
    type: "Full Time",
    tags: ["Marketing"],
  },
  {
    id: 8,
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    description: "Twitter is looking for Data Analyst to help team desi ...",
    type: "Full Time",
    tags: ["Technology"],
  },
];

//=== Featured Jobs Component (Desktop Only) ===
const FeaturedJobs = () => {
  return (
    <section className="hidden md:block py-12 lg:py-16 bg-white">
      <div className="site-container">
        {/* === Section Header === */}
        <div className="flex items-center justify-between mb-10">
          {/* === Section Title === */}
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#25324B]">
            Featured <span className="text-[#26A4FF]">jobs</span>
          </h2>

          {/* === Show All Jobs Link === */}
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-[#4640DE] font-semibold text-base hover:opacity-80 transition-opacity"
          >
            Show all jobs
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* === Jobs Grid (4 columns, 2 rows) === */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredJobs.map((job) => (
            <FeaturedJobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

//=== Type Definition ===
type JobType = (typeof featuredJobs)[0];

//=== Featured Job Card Component ===
const FeaturedJobCard = ({ job }: { job: JobType }) => {
  const logo = logoColors[job.company] || { bg: "#6366F1", text: "#FFFFFF" };

  return (
    <div className="border border-[#D6DDEB] rounded-xl p-6 hover-lift cursor-pointer group bg-white">
      {/* === Card Header (Logo + Job Type Badge) === */}
      <div className="flex items-center justify-between mb-5">
        {/* === Company Logo Placeholder === */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ backgroundColor: logo.bg, color: logo.text }}
        >
          {job.company.charAt(0)}
        </div>

        {/* === Job Type Badge === */}
        <span className="text-xs font-medium text-[#4640DE] border border-[#4640DE] px-3 py-1 rounded-full">
          {job.type}
        </span>
      </div>

      {/* === Job Title === */}
      <h3 className="text-lg font-semibold text-[#25324B] mb-1 group-hover:text-[#4640DE] transition-colors">
        {job.title}
      </h3>

      {/* === Company Name & Location === */}
      <p className="text-sm text-[#7C8493] mb-3">
        {job.company} &middot; {job.location}
      </p>

      {/* === Job Description (Truncated) === */}
      <p className="text-sm text-[#7C8493] mb-5 line-clamp-2 leading-relaxed">
        {job.description}
      </p>

      {/* === Tags === */}
      <div className="flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs font-medium px-3 py-1 rounded-full border ${
              tagStyles[tag] || "text-[#7C8493] border-[#D6DDEB] bg-[#F8F8FD]"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobs;
