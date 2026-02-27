//=== Imports ===
import React from "react";

//=== Tag Color Configuration (Mobile Latest Jobs) ===
const mobileTagStyles: Record<string, string> = {
  "Full-Time": "text-[#E8A230] bg-[#FFF6E5]",
  Marketing: "text-[#56CDAD] bg-[#E7F6F2]",
  Design: "text-[#4640DE] bg-[#F0EFFF]",
  Developer: "text-[#4640DE] bg-[#F0EFFF]",
  Management: "text-[#7C8493] bg-[#F1F1F5]",
};

//=== Company Logo Placeholder Colors ===
const latestLogoColors: Record<string, { bg: string; text: string }> = {
  Nomad: { bg: "#2ECE6D", text: "#FFFFFF" },
  Dropbox: { bg: "#0061FF", text: "#FFFFFF" },
  Terraform: { bg: "#7B61FF", text: "#FFFFFF" },
  Packer: { bg: "#FF4154", text: "#FFFFFF" },
  Netlify: { bg: "#20C6B7", text: "#FFFFFF" },
  Maze: { bg: "#6366F1", text: "#FFFFFF" },
};

//=== Latest Jobs Data ===
const latestJobs = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, USA",
    tags: ["Full-Time", "Design"],
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    tags: ["Full-Time", "Developer"],
  },
  {
    id: 4,
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    tags: ["Full-Time", "Marketing", "Management"],
  },
  {
    id: 5,
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    tags: ["Full-Time", "Marketing"],
  },
  {
    id: 6,
    title: "Brand Designer",
    company: "Maze",
    location: "San Fransisco, USA",
    tags: ["Full-Time", "Marketing", "Design"],
  },
];

//=== Latest Jobs Component (Mobile Only) ===
const LatestJobs = () => {
  return (
    <section className="md:hidden">
      {/* === Section Header (Dark Background) === */}
      <div className="bg-[#202430] px-4 sm:px-6 py-10">
        <h2 className="text-3xl font-bold leading-tight">
          <span className="text-white">Latest </span>
          <span className="text-[#56CDAD]">jobs open</span>
        </h2>
      </div>

      {/* === Job Cards List === */}
      <div className="bg-[#F8F8FD] px-4 sm:px-6 py-6">
        <div className="flex flex-col gap-4">
          {latestJobs.map((job) => (
            <LatestJobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

//=== Type Definition ===
type LatestJobType = (typeof latestJobs)[0];

//=== Latest Job Card Component ===
const LatestJobCard = ({ job }: { job: LatestJobType }) => {
  const logo = latestLogoColors[job.company] || {
    bg: "#6366F1",
    text: "#FFFFFF",
  };

  return (
    <div className="bg-white rounded-sm p-5 border border-[#D6DDEB]">
      {/* === Company Logo Placeholder === */}
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center text-base font-bold mb-4"
        style={{ backgroundColor: logo.bg, color: logo.text }}
      >
        {job.company.charAt(0)}
      </div>

      {/* === Job Title === */}
      <h3 className="text-lg font-bold text-[#25324B] mb-1">{job.title}</h3>

      {/* === Company & Location === */}
      <p className="text-sm text-[#515B6F] mb-4">
        {job.company} &bull; {job.location}
      </p>

      {/* === Job Tags === */}
      <div className="flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs font-medium px-3 py-1.5 rounded-full ${
              mobileTagStyles[tag] || "text-[#7C8493] bg-[#F1F1F5]"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
