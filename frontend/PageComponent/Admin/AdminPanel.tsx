"use client";

//=== Imports ===
import React, { useState } from "react";
import {
  Plus,
  Trash2,
  X,
  Briefcase,
  MapPin,
  Shield,
  LogOut,
  Users,
  Copy,
  Check,
  Info,
  Eye,
  ExternalLink,
} from "lucide-react";
import { useJobs } from "@/Hooks/useJobs";
import { useAuth } from "@/SharedComponents/Providers/AuthProvider";
import type { Job } from "@/Type/Jobs/Job";
import { toast } from "sonner";

//=== Category Options ===
const categoryOptions = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
];

//=== Job Type Options ===
const typeOptions: Job["type"][] = [
  "Full-Time",
  "Part-Time",
  "Contract",
  "Remote",
  "Internship",
];

//=== Tag Options ===
const tagOptions = [
  "Marketing",
  "Design",
  "Business",
  "Technology",
  "Engineering",
  "Developer",
  "Finance",
  "Sales",
  "Management",
];

//=== Test Data for Quick Fill (Testing Only) ===
const testData = {
  title: "Senior Frontend Developer",
  company: "TechFlow Inc.",
  location: "Berlin, Germany",
  salary: "$75,000 - $95,000",
  description:
    "TechFlow Inc. is seeking a Senior Frontend Developer to lead the development of our next-generation web platform. You will collaborate with designers, product managers, and backend engineers to deliver high-quality, scalable user interfaces. The ideal candidate is passionate about modern web technologies and has a track record of building performant applications.",
  requirements:
    "• 4+ years of professional frontend development experience\n• Strong proficiency in React, TypeScript, and Next.js\n• Experience with state management libraries (Redux, Zustand)\n• Familiarity with testing frameworks (Jest, React Testing Library)\n• Excellent problem-solving and communication skills\n• Experience with code reviews and mentoring junior developers",
  skills:
    "React, TypeScript, Next.js, Tailwind CSS, Redux, Zustand, Jest, React Testing Library, Git, CI/CD, REST APIs, GraphQL, Figma",
  education:
    "Bachelor's degree in Computer Science, Software Engineering, or a related field. Equivalent practical experience is also accepted. Relevant certifications (e.g., AWS, Meta Frontend Developer) are a plus.",
  benefits:
    "• Competitive salary with annual reviews\n• Stock options / equity package\n• Flexible remote-first work policy\n• 30 days paid vacation + public holidays\n• €2,000 annual learning & conference budget\n• Premium health, dental, and vision insurance\n• Monthly wellness stipend\n• Home office setup allowance",
  companyDetails:
    "TechFlow Inc. is a Berlin-based SaaS company founded in 2020, building developer tools used by over 50,000 teams worldwide. Our stack includes React, Node.js, and PostgreSQL. We are a team of 120 people spread across 15 countries, united by a passion for great developer experience. We value transparency, autonomy, and continuous learning.",
};

//=== CopyButton Component ===
const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg transition-all duration-200 ${
        copied
          ? "bg-[#E7F6F2] text-[#56CDAD]"
          : "bg-[#F0EFFF] text-[#4640DE] hover:bg-[#E0DAFF]"
      }`}
      title={`Copy ${label}`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied!" : `Copy ${label}`}
    </button>
  );
};

//=== Admin Panel Component ===
const AdminPanel = () => {
  //=== Context Hooks ===
  const { jobs, addJob, deleteJob } = useJobs();
  const { user, logout } = useAuth();

  //=== Modal States ===
  const [showAddModal, setShowAddModal] = useState(false);
  const [showApplicantsJobId, setShowApplicantsJobId] = useState<string | null>(
    null,
  );
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  //=== New Job Form State ===
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-Time" as Job["type"],
    category: "Technology",
    description: "",
    requirements: "",
    skills: "",
    education: "",
    benefits: "",
    companyDetails: "",
    salary: "",
    tags: [] as string[],
  });
  const [formError, setFormError] = useState("");
  const [showTestData, setShowTestData] = useState(false);

  //=== Handle Input Change ===
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setNewJob((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //=== Handle Tag Toggle ===
  const handleTagToggle = (tag: string) => {
    setNewJob((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  //=== Handle Add Job Submit ===
  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    //=== Validation ===
    if (
      !newJob.title ||
      !newJob.company ||
      !newJob.location ||
      !newJob.description ||
      !newJob.salary
    ) {
      setFormError("Please fill in all required fields");
      return;
    }

    if (newJob.tags.length === 0) {
      setFormError("Please select at least one tag");
      return;
    }

    addJob(newJob);
    toast.success(`"${newJob.title}" has been added successfully!`);

    //=== Reset Form ===
    setNewJob({
      title: "",
      company: "",
      location: "",
      type: "Full-Time",
      category: "Technology",
      description: "",
      requirements: "",
      skills: "",
      education: "",
      benefits: "",
      companyDetails: "",
      salary: "",
      tags: [],
    });
    setShowAddModal(false);
    setShowTestData(false);
  };

  //=== Handle Delete Confirm ===
  const handleDelete = (id: string) => {
    const job = jobs.find((j) => j.id === id);
    deleteJob(id);
    setDeleteConfirmId(null);
    toast.success(`"${job?.title}" has been deleted`);
  };

  //=== Get applicants job ===
  const applicantsJob = showApplicantsJobId
    ? jobs.find((j) => j.id === showApplicantsJobId)
    : null;

  return (
    <section className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-[#F8F8FD] to-white page-transition">
      <div className="site-container py-8">
        {/* === Admin Header === */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Shield size={24} className="text-[#4640DE]" />
              <h1 className="text-2xl sm:text-3xl font-bold text-[#25324B]">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-sm text-[#7C8493]">
              Welcome, {user?.name} &middot; Manage job listings
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* === Add New Job Button === */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-[#4640DE] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#3530C9] hover:shadow-lg hover:shadow-[#4640DE]/25 transition-all duration-300 active:scale-[0.97]"
            >
              <Plus size={18} />
              Add New Job
            </button>

            {/* === Logout Button === */}
            <button
              onClick={logout}
              className="flex items-center gap-2 border border-[#D6DDEB] text-[#7C8493] px-4 py-2.5 rounded-xl text-sm hover:border-red-300 hover:text-red-500 transition-all duration-300"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* === Stats Summary === */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-[#D6DDEB]/80 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover-lift animate-fade-in-up">
            <p className="text-sm text-[#7C8493] mb-1">Total Jobs</p>
            <p className="text-2xl font-bold text-[#25324B]">{jobs.length}</p>
          </div>
          <div
            className="bg-white border border-[#D6DDEB]/80 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover-lift animate-fade-in-up animation-delay-100"
            style={{ animationFillMode: "both" }}
          >
            <p className="text-sm text-[#7C8493] mb-1">Full-Time</p>
            <p className="text-2xl font-bold text-[#25324B]">
              {jobs.filter((j) => j.type === "Full-Time").length}
            </p>
          </div>
          <div
            className="bg-white border border-[#D6DDEB]/80 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover-lift animate-fade-in-up animation-delay-200"
            style={{ animationFillMode: "both" }}
          >
            <p className="text-sm text-[#7C8493] mb-1">Part-Time</p>
            <p className="text-2xl font-bold text-[#25324B]">
              {jobs.filter((j) => j.type === "Part-Time").length}
            </p>
          </div>
          <div
            className="bg-white border border-[#D6DDEB]/80 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover-lift animate-fade-in-up animation-delay-300"
            style={{ animationFillMode: "both" }}
          >
            <p className="text-sm text-[#7C8493] mb-1">Remote</p>
            <p className="text-2xl font-bold text-[#25324B]">
              {jobs.filter((j) => j.type === "Remote").length}
            </p>
          </div>
        </div>

        {/* === Jobs Table === */}
        <div className="bg-white border border-[#D6DDEB]/80 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] animate-fade-in-up">
          {/* === Table Header === */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-[#F8F8FD] border-b border-[#D6DDEB] text-sm font-semibold text-[#7C8493]">
            <div className="col-span-3">Job Title</div>
            <div className="col-span-2">Company</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-1">Type</div>
            <div className="col-span-1">Applicants</div>
            <div className="col-span-1">Posted</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* === Table Body === */}
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 border-b border-[#D6DDEB] last:border-b-0 hover:bg-[#F8F8FD]/50 transition-colors items-center"
              >
                {/* === Job Title === */}
                <div className="md:col-span-3">
                  <p className="text-sm font-semibold text-[#25324B]">
                    {job.title}
                  </p>
                  <p className="text-xs text-[#7C8493] md:hidden">
                    {job.company} &middot; {job.location}
                  </p>
                </div>

                {/* === Company (Desktop) === */}
                <div className="hidden md:block md:col-span-2">
                  <p className="text-sm text-[#515B6F]">{job.company}</p>
                </div>

                {/* === Location (Desktop) === */}
                <div className="hidden md:flex md:col-span-2 items-center gap-1">
                  <MapPin size={14} className="text-[#7C8493]" />
                  <p className="text-sm text-[#515B6F]">{job.location}</p>
                </div>

                {/* === Type Badge === */}
                <div className="md:col-span-1">
                  <span className="text-xs font-medium text-[#4640DE] bg-[#F0EFFF] px-2 py-1 rounded">
                    {job.type}
                  </span>
                </div>

                {/* === Applicants Count === */}
                <div className="md:col-span-1">
                  <button
                    onClick={() => setShowApplicantsJobId(job.id)}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg transition-all duration-200 ${
                      job.applicants.length > 0
                        ? "bg-[#E7F6F2] text-[#56CDAD] hover:bg-[#D0EFE7] cursor-pointer"
                        : "bg-[#F1F1F5] text-[#7C8493] cursor-pointer hover:bg-[#E8E8ED]"
                    }`}
                    title="View applicants"
                  >
                    <Users size={12} />
                    {job.applicants.length}
                  </button>
                </div>

                {/* === Posted Date (Desktop) === */}
                <div className="hidden md:block md:col-span-1">
                  <p className="text-xs text-[#7C8493]">{job.postedDate}</p>
                </div>

                {/* === Actions === */}
                <div className="md:col-span-2 flex justify-end items-center gap-2">
                  {/* === View Applicants Button === */}
                  <button
                    onClick={() => setShowApplicantsJobId(job.id)}
                    className="text-[#4640DE] hover:text-[#3530C9] transition-colors p-1"
                    title="View applicants"
                  >
                    <Eye size={16} />
                  </button>

                  {/* === Delete === */}
                  {deleteConfirmId === job.id ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="text-xs text-[#7C8493] hover:text-[#25324B]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(job.id)}
                      className="text-[#7C8493] hover:text-red-500 transition-colors p-1"
                      title="Delete job"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            //=== Empty State ===
            <div className="text-center py-12">
              <Briefcase size={40} className="text-[#D6DDEB] mx-auto mb-3" />
              <p className="text-[#7C8493] text-sm">
                No jobs yet. Click &quot;Add New Job&quot; to get started.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ========================================== */}
      {/* === Add Job Modal === */}
      {/* ========================================== */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-[700px] max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            {/* === Modal Header === */}
            <div className="flex items-center justify-between p-6 border-b border-[#D6DDEB] sticky top-0 bg-white z-10 rounded-t-2xl">
              <h2 className="text-xl font-bold text-[#25324B]">
                Add New Job Listing
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowTestData(false);
                }}
                className="text-[#7C8493] hover:text-[#25324B] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* === Modal Body (Form) === */}
            <form onSubmit={handleAddJob} className="p-6">
              {/* === Test Data Panel === */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setShowTestData((prev) => !prev)}
                  className="flex items-center gap-2 text-sm font-semibold text-[#4640DE] hover:text-[#3530C9] transition-colors"
                >
                  <Info size={16} />
                  {showTestData ? "Hide Test Data" : "Show Copiable Test Data"}
                </button>

                {showTestData && (
                  <div className="mt-3 bg-gradient-to-br from-[#FFFBEB] to-[#FFF6E5] border border-[#FFD88D] rounded-2xl p-5 animate-scale-in">
                    {/* === Test Data Note === */}
                    <div className="flex items-start gap-2 mb-4 p-3 bg-white/60 rounded-xl border border-[#FFD88D]/50">
                      <Info
                        size={16}
                        className="text-[#FFB836] mt-0.5 flex-shrink-0"
                      />
                      <p className="text-xs text-[#8B7355] leading-relaxed">
                        <strong className="text-[#6B5A3E]">
                          Testing Only:
                        </strong>{" "}
                        These are sample values for quick testing. Click any
                        &quot;Copy&quot; button to copy the value to your
                        clipboard, then paste it into the corresponding field
                        below.
                      </p>
                    </div>

                    {/* === Test Data Fields === */}
                    <div className="flex flex-col gap-3">
                      {[
                        { label: "Title", value: testData.title },
                        { label: "Company", value: testData.company },
                        { label: "Location", value: testData.location },
                        { label: "Salary", value: testData.salary },
                        { label: "Description", value: testData.description },
                        { label: "Requirements", value: testData.requirements },
                        { label: "Skills", value: testData.skills },
                        { label: "Education", value: testData.education },
                        { label: "Benefits", value: testData.benefits },
                        {
                          label: "Company Details",
                          value: testData.companyDetails,
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="bg-white/80 rounded-xl p-3 border border-[#FFD88D]/30"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-[#6B5A3E]">
                              {item.label}
                            </span>
                            <CopyButton text={item.value} label={item.label} />
                          </div>
                          <p className="text-xs text-[#8B7355] leading-relaxed line-clamp-2">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* === Form Error === */}
              {formError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm animate-scale-in">
                  {formError}
                </div>
              )}

              <div className="flex flex-col gap-4">
                {/* === Job Title === */}
                <div>
                  <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newJob.title}
                    onChange={handleChange}
                    placeholder="e.g., Senior Frontend Developer"
                    className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm transition-all duration-200"
                  />
                </div>

                {/* === Company & Location Row === */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
                      Company *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={newJob.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={newJob.location}
                      onChange={handleChange}
                      placeholder="e.g., Berlin, Germany"
                      className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm transition-all duration-200"
                    />
                  </div>
                </div>

                {/* === Type & Category Row === */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
                      Job Type *
                    </label>
                    <select
                      name="type"
                      value={newJob.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] text-sm transition-all duration-200 bg-white"
                    >
                      {typeOptions.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={newJob.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] text-sm transition-all duration-200 bg-white"
                    >
                      {categoryOptions.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* === Salary === */}
                <div>
                  <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
                    Salary Range *
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={newJob.salary}
                    onChange={handleChange}
                    placeholder="e.g., $60,000 - $80,000"
                    className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm transition-all duration-200"
                  />
                </div>

                {/* === Description === */}
                <div>
                  <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={newJob.description}
                    onChange={handleChange}
                    placeholder="Write a detailed job description..."
                    rows={4}
                    className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm resize-none transition-all duration-200"
                  />
                </div>

                {/* === Requirements === */}
                <div>
                  <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
                    Requirements
                  </label>
                  <textarea
                    name="requirements"
                    value={newJob.requirements}
                    onChange={handleChange}
                    placeholder="List the job requirements (use bullet points with •)"
                    rows={4}
                    className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm resize-none transition-all duration-200"
                  />
                </div>

                {/* === Skills === */}
                <div>
                  <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
                    Skills{" "}
                    <span className="font-normal text-[#7C8493]">
                      (comma-separated)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={newJob.skills}
                    onChange={handleChange}
                    placeholder="e.g., React, TypeScript, Node.js, Tailwind CSS"
                    className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm transition-all duration-200"
                  />
                </div>

                {/* === Education === */}
                <div>
                  <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
                    Education
                  </label>
                  <textarea
                    name="education"
                    value={newJob.education}
                    onChange={handleChange}
                    placeholder="Describe the education requirements..."
                    rows={3}
                    className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm resize-none transition-all duration-200"
                  />
                </div>

                {/* === Benefits === */}
                <div>
                  <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
                    Benefits
                  </label>
                  <textarea
                    name="benefits"
                    value={newJob.benefits}
                    onChange={handleChange}
                    placeholder="List the benefits (use bullet points with •)"
                    rows={4}
                    className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm resize-none transition-all duration-200"
                  />
                </div>

                {/* === Company Details === */}
                <div>
                  <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
                    Company Details
                  </label>
                  <textarea
                    name="companyDetails"
                    value={newJob.companyDetails}
                    onChange={handleChange}
                    placeholder="Describe the company, its mission, and culture..."
                    rows={3}
                    className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm resize-none transition-all duration-200"
                  />
                </div>

                {/* === Tags Selection === */}
                <div>
                  <label className="block text-sm font-semibold text-[#25324B] mb-2">
                    Tags *{" "}
                    <span className="font-normal text-[#7C8493]">
                      (select at least one)
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                          newJob.tags.includes(tag)
                            ? "bg-[#4640DE] text-white border-[#4640DE]"
                            : "bg-white text-[#515B6F] border-[#D6DDEB] hover:border-[#4640DE]"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* === Modal Footer === */}
              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[#D6DDEB]">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowTestData(false);
                  }}
                  className="px-5 py-2.5 text-sm font-semibold text-[#7C8493] hover:text-[#25324B] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#4640DE] text-white text-sm font-semibold rounded-xl hover:bg-[#3530C9] hover:shadow-lg hover:shadow-[#4640DE]/25 transition-all duration-300 active:scale-[0.97]"
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* === View Applicants Modal === */}
      {/* ========================================== */}
      {showApplicantsJobId && applicantsJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-[600px] max-h-[80vh] overflow-y-auto shadow-2xl animate-scale-in">
            {/* === Modal Header === */}
            <div className="flex items-center justify-between p-6 border-b border-[#D6DDEB] sticky top-0 bg-white z-10 rounded-t-2xl">
              <div>
                <h2 className="text-lg font-bold text-[#25324B]">Applicants</h2>
                <p className="text-sm text-[#7C8493]">
                  {applicantsJob.title} at {applicantsJob.company} &middot;{" "}
                  <span className="font-medium text-[#4640DE]">
                    {applicantsJob.applicants.length} applicant
                    {applicantsJob.applicants.length !== 1 ? "s" : ""}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setShowApplicantsJobId(null)}
                className="text-[#7C8493] hover:text-[#25324B] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* === Applicants List === */}
            <div className="p-6">
              {applicantsJob.applicants.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {applicantsJob.applicants.map((applicant, index) => (
                    <div
                      key={index}
                      className="bg-[#F8F8FD] rounded-2xl p-5 border border-[#D6DDEB]/60 hover:border-[#4640DE]/20 transition-all duration-200"
                    >
                      {/* === Applicant Header === */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#4640DE] to-[#6C63FF] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {applicant.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#25324B]">
                              {applicant.name}
                            </p>
                            <p className="text-xs text-[#7C8493]">
                              {applicant.email}
                            </p>
                          </div>
                        </div>
                        {applicant.appliedDate && (
                          <span className="text-xs text-[#7C8493] bg-white px-2.5 py-1 rounded-lg border border-[#D6DDEB]/60">
                            {applicant.appliedDate}
                          </span>
                        )}
                      </div>

                      {/* === Resume Link === */}
                      <div className="flex items-center gap-2 mb-3">
                        <ExternalLink size={14} className="text-[#4640DE]" />
                        <a
                          href={applicant.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#4640DE] hover:underline font-medium"
                        >
                          {applicant.resumeLink}
                        </a>
                      </div>

                      {/* === Cover Note === */}
                      <div className="bg-white rounded-xl p-3 border border-[#D6DDEB]/40">
                        <p className="text-xs font-semibold text-[#7C8493] mb-1">
                          Cover Note
                        </p>
                        <p className="text-sm text-[#515B6F] leading-relaxed">
                          {applicant.coverNote}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                //=== No Applicants ===
                <div className="text-center py-12">
                  <Users size={40} className="text-[#D6DDEB] mx-auto mb-3" />
                  <p className="text-sm font-semibold text-[#25324B] mb-1">
                    No applicants yet
                  </p>
                  <p className="text-xs text-[#7C8493]">
                    Applicants will appear here once someone applies for this
                    position.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminPanel;
