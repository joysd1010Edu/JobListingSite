"use client";

//=== Imports ===
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MapPin, ChevronDown, ArrowRight } from "lucide-react";
import { useJobs } from "@/Hooks/useJobs";

//=== Category Filter Options ===
const categoryOptions = [
  "All",
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
];

//=== Job Type Filter Options ===
const typeOptions = [
  "All",
  "Full-Time",
  "Part-Time",
  "Contract",
  "Remote",
  "Internship",
];

//=== Tag Color Map ===
const tagColors: Record<string, string> = {
  Marketing: "text-[#FFB836] bg-[#FFF6E5]",
  Design: "text-[#56CDAD] bg-[#E7F6F2]",
  Business: "text-[#4640DE] bg-[#F0EFFF]",
  Technology: "text-[#FF6550] bg-[#FFEAE6]",
  Engineering: "text-[#4640DE] bg-[#F0EFFF]",
  Developer: "text-[#4640DE] bg-[#F0EFFF]",
  Finance: "text-[#FFB836] bg-[#FFF6E5]",
  Sales: "text-[#56CDAD] bg-[#E7F6F2]",
  Management: "text-[#7C8493] bg-[#F1F1F5]",
  "Human Resource": "text-[#FF6550] bg-[#FFEAE6]",
};

//=== Listing Page Component ===
const Listing = () => {
  //=== State ===
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [locationQuery, setLocationQuery] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  //=== Jobs Context ===
  const { jobs, isLoading } = useJobs();

  //=== Filtered Jobs (Memoized) ===
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      //=== Search Filter ===
      const matchesSearch =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      //=== Category Filter ===
      const matchesCategory =
        selectedCategory === "All" || job.category === selectedCategory;

      //=== Type Filter ===
      const matchesType = selectedType === "All" || job.type === selectedType;

      //=== Location Filter ===
      const matchesLocation =
        !locationQuery ||
        job.location.toLowerCase().includes(locationQuery.toLowerCase());

      return matchesSearch && matchesCategory && matchesType && matchesLocation;
    });
  }, [jobs, searchQuery, selectedCategory, selectedType, locationQuery]);

  return (
    <section className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-[#F8F8FD] to-white page-transition">
      {/* === Search Header Bar === */}
      <div className="bg-white border-b border-[#D6DDEB]/50 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
        <div className="site-container py-6">
          {/* === Page Title === */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#25324B] mb-6">
            Find your <span className="text-[#26A4FF]">dream job</span>
          </h1>

          {/* === Search & Filter Row === */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* === Job Title Search === */}
            <div className="flex items-center gap-3 flex-1 bg-white border border-[#D6DDEB] rounded-xl px-4 py-3 focus-within:border-[#4640DE] focus-within:ring-2 focus-within:ring-[#4640DE]/10 transition-all duration-200">
              <Search size={20} className="text-[#515B6F] flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title or keyword"
                className="w-full outline-none text-[#25324B] placeholder:text-[#A8ADB7] text-sm bg-transparent"
              />
            </div>

            {/* === Location Search === */}
            <div className="flex items-center gap-3 md:w-60 bg-white border border-[#D6DDEB] rounded-xl px-4 py-3 focus-within:border-[#4640DE] focus-within:ring-2 focus-within:ring-[#4640DE]/10 transition-all duration-200">
              <MapPin size={20} className="text-[#515B6F] flex-shrink-0" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Location"
                className="w-full outline-none text-[#25324B] placeholder:text-[#A8ADB7] text-sm bg-transparent"
              />
            </div>

            {/* === Category Dropdown === */}
            <div className="relative md:w-48">
              <button
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                  setShowTypeDropdown(false);
                }}
                className="w-full flex items-center justify-between gap-2 bg-white border border-[#D6DDEB] rounded-lg px-4 py-3 text-sm text-[#25324B]"
              >
                <span
                  className={selectedCategory === "All" ? "text-[#A8ADB7]" : ""}
                >
                  {selectedCategory === "All" ? "Category" : selectedCategory}
                </span>
                <ChevronDown size={16} className="text-[#515B6F]" />
              </button>
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#D6DDEB] rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowCategoryDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#F8F8FD] transition-colors ${
                        selectedCategory === cat
                          ? "text-[#4640DE] font-semibold bg-[#F0EFFF]"
                          : "text-[#515B6F]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* === Type Dropdown === */}
            <div className="relative md:w-40">
              <button
                onClick={() => {
                  setShowTypeDropdown(!showTypeDropdown);
                  setShowCategoryDropdown(false);
                }}
                className="w-full flex items-center justify-between gap-2 bg-white border border-[#D6DDEB] rounded-lg px-4 py-3 text-sm text-[#25324B]"
              >
                <span
                  className={selectedType === "All" ? "text-[#A8ADB7]" : ""}
                >
                  {selectedType === "All" ? "Job Type" : selectedType}
                </span>
                <ChevronDown size={16} className="text-[#515B6F]" />
              </button>
              {showTypeDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#D6DDEB] rounded-lg shadow-lg z-20">
                  {typeOptions.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType(type);
                        setShowTypeDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#F8F8FD] transition-colors ${
                        selectedType === type
                          ? "text-[#4640DE] font-semibold bg-[#F0EFFF]"
                          : "text-[#515B6F]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* === Active Filters Display === */}
          {(selectedCategory !== "All" ||
            selectedType !== "All" ||
            searchQuery ||
            locationQuery) && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-xs text-[#7C8493]">Active filters:</span>
              {selectedCategory !== "All" && (
                <span className="text-xs bg-[#F0EFFF] text-[#4640DE] px-3 py-1 rounded-full flex items-center gap-1">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="ml-1 hover:opacity-70"
                  >
                    &times;
                  </button>
                </span>
              )}
              {selectedType !== "All" && (
                <span className="text-xs bg-[#F0EFFF] text-[#4640DE] px-3 py-1 rounded-full flex items-center gap-1">
                  {selectedType}
                  <button
                    onClick={() => setSelectedType("All")}
                    className="ml-1 hover:opacity-70"
                  >
                    &times;
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="text-xs bg-[#F0EFFF] text-[#4640DE] px-3 py-1 rounded-full flex items-center gap-1">
                  &quot;{searchQuery}&quot;
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-1 hover:opacity-70"
                  >
                    &times;
                  </button>
                </span>
              )}
              {locationQuery && (
                <span className="text-xs bg-[#F0EFFF] text-[#4640DE] px-3 py-1 rounded-full flex items-center gap-1">
                  {locationQuery}
                  <button
                    onClick={() => setLocationQuery("")}
                    className="ml-1 hover:opacity-70"
                  >
                    &times;
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedType("All");
                  setSearchQuery("");
                  setLocationQuery("");
                }}
                className="text-xs text-[#4640DE] font-semibold hover:underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* === Job Listings Grid === */}
      <div className="site-container py-8">
        {/* === Results Count === */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#7C8493]">
            Showing{" "}
            <span className="font-semibold text-[#25324B]">
              {filteredJobs.length}
            </span>{" "}
            jobs
          </p>
        </div>

        {/* === Jobs Grid === */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-[#4640DE] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#7C8493]">Loading jobs...</p>
            </div>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="bg-white border border-[#D6DDEB]/80 rounded-2xl p-6 hover-lift hover:border-[#4640DE]/30 transition-all duration-300 group animate-fade-in-up"
              >
                {/* === Card Header === */}
                <div className="flex items-center justify-between mb-4">
                  {/* === Company Logo Placeholder === */}
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F0EFFF] to-[#E0DAFF] rounded-xl flex items-center justify-center text-[#4640DE] font-bold text-lg">
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

                {/* === Company & Location === */}
                <p className="text-sm text-[#7C8493] mb-3">
                  {job.company} &middot; {job.location}
                </p>

                {/* === Description === */}
                <p className="text-sm text-[#7C8493] mb-4 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* === Tags === */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        tagColors[tag] || "text-[#7C8493] bg-[#F1F1F5]"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* === View & Salary === */}
                <div className="flex items-center justify-between pt-3 border-t border-[#D6DDEB]">
                  <span className="text-xs text-[#7C8493]">{job.salary}</span>
                  <span className="text-xs font-semibold text-[#4640DE] flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          //=== No Results State ===
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#F0EFFF] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={28} className="text-[#4640DE]" />
            </div>
            <h3 className="text-lg font-semibold text-[#25324B] mb-2">
              No jobs found
            </h3>
            <p className="text-sm text-[#7C8493]">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Listing;
