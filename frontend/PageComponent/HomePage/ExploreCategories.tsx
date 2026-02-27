//=== Imports ===
import React from "react";
import {
  ArrowRight,
  PenTool,
  BarChart3,
  Megaphone,
  Landmark,
  Monitor,
  Code,
  Briefcase,
  Users,
} from "lucide-react";
import Link from "next/link";

//=== Category Data ===
const categories = [
  { name: "Design", count: 235, icon: PenTool, highlighted: false },
  { name: "Sales", count: 756, icon: BarChart3, highlighted: false },
  { name: "Marketing", count: 140, icon: Megaphone, highlighted: true },
  { name: "Finance", count: 325, icon: Landmark, highlighted: false },
  { name: "Technology", count: 436, icon: Monitor, highlighted: false },
  { name: "Engineering", count: 542, icon: Code, highlighted: false },
  { name: "Business", count: 211, icon: Briefcase, highlighted: false },
  { name: "Human Resource", count: 346, icon: Users, highlighted: false },
];

//=== Explore Categories Component ===
const ExploreCategories = () => {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* === Section Header === */}
        <div className="flex items-center justify-between mb-10">
          {/* === Section Title === */}
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#25324B] leading-tight">
            Explore by <span className="text-[#26A4FF]">category</span>
          </h2>

          {/* === Show All Link (Desktop) === */}
          <Link
            href="/jobs"
            className="hidden sm:flex items-center gap-2 text-[#4640DE] font-semibold text-base hover:opacity-80 transition-opacity"
          >
            Show all jobs
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* === Categories Grid (Desktop: 4 columns) === */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>

        {/* === Categories List (Mobile: single column) === */}
        <div className="md:hidden flex flex-col gap-4">
          {categories.map((category) => (
            <CategoryListItem key={category.name} category={category} />
          ))}
        </div>

        {/* === Show All Link (Mobile) === */}
        <Link
          href="/jobs"
          className="sm:hidden flex items-center gap-2 text-[#4640DE] font-semibold text-base mt-6 hover:opacity-80 transition-opacity"
        >
          Show all jobs
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

//=== Type Definition for Category ===
type CategoryType = (typeof categories)[0];

//=== Category Card Component (Desktop Grid View) ===
const CategoryCard = ({ category }: { category: CategoryType }) => {
  const Icon = category.icon;
  const isHighlighted = category.highlighted;

  return (
    <Link
      href={`/jobs/${category.name.toLowerCase().replace(" ", "-")}`}
      className={`group p-8 rounded-sm border transition-all duration-300 cursor-pointer ${
        isHighlighted
          ? "bg-[#4640DE] border-[#4640DE] text-white"
          : "bg-white border-[#D6DDEB] hover:bg-[#4640DE] hover:border-[#4640DE] hover:text-white"
      }`}
    >
      {/* === Category Icon Container === */}
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-lg mb-8 ${
          isHighlighted ? "bg-white/20" : "bg-[#F0EFFF] group-hover:bg-white/20"
        }`}
      >
        <Icon
          size={24}
          className={
            isHighlighted
              ? "text-white"
              : "text-[#4640DE] group-hover:text-white"
          }
        />
      </div>

      {/* === Category Name === */}
      <h3
        className={`text-lg font-semibold mb-2 ${
          isHighlighted ? "text-white" : "text-[#25324B] group-hover:text-white"
        }`}
      >
        {category.name}
      </h3>

      {/* === Job Count & Arrow === */}
      <div className="flex items-center gap-4">
        <span
          className={`text-sm ${
            isHighlighted
              ? "text-white/80"
              : "text-[#7C8493] group-hover:text-white/80"
          }`}
        >
          {category.count} jobs available
        </span>
        <ArrowRight
          size={18}
          className={
            isHighlighted
              ? "text-white"
              : "text-[#7C8493] group-hover:text-white"
          }
        />
      </div>
    </Link>
  );
};

//=== Category List Item Component (Mobile View) ===
const CategoryListItem = ({ category }: { category: CategoryType }) => {
  const Icon = category.icon;

  return (
    <Link
      href={`/jobs/${category.name.toLowerCase().replace(" ", "-")}`}
      className="flex items-center gap-4 p-4 border border-[#D6DDEB] rounded-sm hover:border-[#4640DE] transition-colors"
    >
      {/* === Category Icon === */}
      <div className="w-12 h-12 flex items-center justify-center bg-[#F0EFFF] rounded-lg flex-shrink-0">
        <Icon size={24} className="text-[#4640DE]" />
      </div>

      {/* === Category Info === */}
      <div className="flex-1">
        <h3 className="text-base font-semibold text-[#25324B]">
          {category.name}
        </h3>
        <span className="text-sm text-[#7C8493]">
          {category.count} Jobs available
        </span>
      </div>

      {/* === Arrow Icon === */}
      <ArrowRight size={18} className="text-[#7C8493] flex-shrink-0" />
    </Link>
  );
};

export default ExploreCategories;
