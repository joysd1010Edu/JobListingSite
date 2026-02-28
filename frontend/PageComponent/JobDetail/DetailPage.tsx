"use client";

//=== Imports ===
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
  ArrowLeft,
  Send,
  CheckCircle,
  FileText,
  ListChecks,
  Sparkles,
  GraduationCap,
  Gift,
  Building2,
} from "lucide-react";
import { useJobs } from "@/Hooks/useJobs";
import type { JobApplicationData } from "@/Type/Jobs/Job";
import { toast } from "sonner";

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
};

//=== Detail Page Component ===
const DetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { getJobById, applyToJob } = useJobs();
  const jobId = params?.id as string;
  const job = getJobById(jobId);

  //=== Application Form State ===
  const [formData, setFormData] = useState<JobApplicationData>({
    name: "",
    email: "",
    resumeLink: "",
    coverNote: "",
  });
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  //=== Handle Input Change ===
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //=== Handle Application Submit ===
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    //=== Validation ===
    if (
      !formData.name ||
      !formData.email ||
      !formData.resumeLink ||
      !formData.coverNote
    ) {
      setFormError("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }

    //=== Simple URL Validation ===
    try {
      new URL(formData.resumeLink);
    } catch {
      setFormError("Please enter a valid URL for your resume");
      toast.error("Please enter a valid URL for your resume");
      return;
    }

    //=== Simulate Submission ===
    applyToJob(jobId, formData);
    setSubmitted(true);
    toast.success(
      `Application submitted for ${job?.title} at ${job?.company}!`,
    );
  };

  //=== Job Not Found State ===
  if (!job) {
    return (
      <section className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-[#F8F8FD] to-white flex items-center justify-center px-4 page-transition">
        <div className="text-center animate-fade-in-up">
          <h2 className="text-2xl font-bold text-[#25324B] mb-2">
            Job Not Found
          </h2>
          <p className="text-[#7C8493] mb-6">
            The job you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 bg-[#4640DE] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#3530C9] hover:shadow-lg hover:shadow-[#4640DE]/25 transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-[#F8F8FD] to-white page-transition">
      <div className="site-container py-8">
        {/* === Back Navigation === */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#7C8493] hover:text-[#4640DE] text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Jobs
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* === Left Column: Job Details === */}
          <div className="flex-1">
            {/* === Job Header Card === */}
            <div className="bg-white rounded-2xl border border-[#D6DDEB]/80 p-6 sm:p-8 mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] animate-fade-in-up">
              {/* === Company Logo + Info === */}
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                {/* === Company Logo === */}
                <div className="w-16 h-16 bg-gradient-to-br from-[#F0EFFF] to-[#E0DAFF] rounded-2xl flex items-center justify-center text-[#4640DE] font-bold text-2xl flex-shrink-0 shadow-sm">
                  {job.company.charAt(0)}
                </div>

                <div className="flex-1">
                  {/* === Job Title === */}
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#25324B] mb-2">
                    {job.title}
                  </h1>

                  {/* === Company & Location === */}
                  <p className="text-base text-[#7C8493]">
                    {job.company} &middot; {job.location}
                  </p>
                </div>

                {/* === Job Type Badge === */}
                <span className="text-sm font-medium text-[#4640DE] border-2 border-[#4640DE] px-4 py-1.5 rounded-full flex-shrink-0">
                  {job.type}
                </span>
              </div>

              {/* === Job Meta Info === */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-[#7C8493]" />
                  <span className="text-sm text-[#515B6F]">{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={18} className="text-[#7C8493]" />
                  <span className="text-sm text-[#515B6F]">{job.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-[#7C8493]" />
                  <span className="text-sm text-[#515B6F]">{job.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-[#7C8493]" />
                  <span className="text-sm text-[#515B6F]">
                    {job.postedDate}
                  </span>
                </div>
              </div>

              {/* === Tags === */}
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-sm font-medium px-4 py-1.5 rounded-full ${
                      tagColors[tag] || "text-[#7C8493] bg-[#F1F1F5]"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* === Job Description Sections === */}
            <div
              className="flex flex-col gap-6 animate-fade-in-up animation-delay-200"
              style={{ animationFillMode: "both" }}
            >
              {/* === Job Description === */}
              {job.description && (
                <div className="bg-white rounded-2xl border border-[#D6DDEB]/80 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-[#F0EFFF] rounded-xl flex items-center justify-center">
                      <FileText size={18} className="text-[#4640DE]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#25324B]">
                      Job Description
                    </h2>
                  </div>
                  <p className="text-[#515B6F] leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              )}

              {/* === Requirements === */}
              {job.requirements && (
                <div className="bg-white rounded-2xl border border-[#D6DDEB]/80 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-[#FFF6E5] rounded-xl flex items-center justify-center">
                      <ListChecks size={18} className="text-[#FFB836]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#25324B]">
                      Requirements
                    </h2>
                  </div>
                  <p className="text-[#515B6F] leading-relaxed whitespace-pre-line">
                    {job.requirements}
                  </p>
                </div>
              )}

              {/* === Skills === */}
              {job.skills && (
                <div className="bg-white rounded-2xl border border-[#D6DDEB]/80 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-[#E7F6F2] rounded-xl flex items-center justify-center">
                      <Sparkles size={18} className="text-[#56CDAD]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#25324B]">Skills</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.split(",").map((skill) => (
                      <span
                        key={skill.trim()}
                        className="text-sm font-medium text-[#4640DE] bg-[#F0EFFF] px-4 py-1.5 rounded-full"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* === Education === */}
              {job.education && (
                <div className="bg-white rounded-2xl border border-[#D6DDEB]/80 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-[#FFEAE6] rounded-xl flex items-center justify-center">
                      <GraduationCap size={18} className="text-[#FF6550]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#25324B]">
                      Education
                    </h2>
                  </div>
                  <p className="text-[#515B6F] leading-relaxed whitespace-pre-line">
                    {job.education}
                  </p>
                </div>
              )}

              {/* === Benefits === */}
              {job.benefits && (
                <div className="bg-white rounded-2xl border border-[#D6DDEB]/80 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-[#E7F6F2] rounded-xl flex items-center justify-center">
                      <Gift size={18} className="text-[#56CDAD]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#25324B]">
                      Benefits
                    </h2>
                  </div>
                  <p className="text-[#515B6F] leading-relaxed whitespace-pre-line">
                    {job.benefits}
                  </p>
                </div>
              )}

              {/* === Company Details === */}
              {job.companyDetails && (
                <div className="bg-white rounded-2xl border border-[#D6DDEB]/80 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-[#F0EFFF] rounded-xl flex items-center justify-center">
                      <Building2 size={18} className="text-[#4640DE]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#25324B]">
                      Company Details
                    </h2>
                  </div>
                  <p className="text-[#515B6F] leading-relaxed whitespace-pre-line">
                    {job.companyDetails}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* === Right Column: Apply Now Form === */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="bg-white rounded-2xl border border-[#D6DDEB]/80 p-6 sm:p-8 sticky top-24 shadow-[0_4px_20px_rgba(0,0,0,0.04)] animate-slide-in-right">
              {submitted ? (
                //=== Success State ===
                <div className="text-center py-8">
                  <CheckCircle
                    size={48}
                    className="text-[#56CDAD] mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-[#25324B] mb-2">
                    Application Sent!
                  </h3>
                  <p className="text-sm text-[#7C8493] mb-6">
                    Your application for {job.title} at {job.company} has been
                    submitted.
                  </p>
                  <Link
                    href="/jobs"
                    className="inline-block bg-[#4640DE] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#3530C9] hover:shadow-lg hover:shadow-[#4640DE]/25 transition-all duration-300"
                  >
                    Browse More Jobs
                  </Link>
                </div>
              ) : (
                //=== Application Form ===
                <>
                  <h2 className="text-xl font-bold text-[#25324B] mb-1">
                    Apply Now
                  </h2>
                  <p className="text-sm text-[#7C8493] mb-6">
                    Fill in the form to apply for this position.
                  </p>

                  {/* === Form Error === */}
                  {formError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm animate-scale-in">
                      {formError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* === Name Field === */}
                    <div>
                      <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm transition-all duration-200"
                      />
                    </div>

                    {/* === Email Field === */}
                    <div>
                      <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm transition-all duration-200"
                      />
                    </div>

                    {/* === Resume Link Field === */}
                    <div>
                      <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
                        Resume Link (URL)
                      </label>
                      <input
                        type="url"
                        name="resumeLink"
                        value={formData.resumeLink}
                        onChange={handleChange}
                        placeholder="https://drive.google.com/your-resume"
                        className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm transition-all duration-200"
                      />
                    </div>

                    {/* === Cover Note Field === */}
                    <div>
                      <label className="block text-sm font-semibold text-[#25324B] mb-1.5">
                        Cover Note
                      </label>
                      <textarea
                        name="coverNote"
                        value={formData.coverNote}
                        onChange={handleChange}
                        placeholder="Tell the employer why you'd be a great fit..."
                        rows={4}
                        className="w-full px-4 py-3 border border-[#D6DDEB] rounded-xl outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/10 text-[#25324B] placeholder:text-[#A8ADB7] text-sm resize-none transition-all duration-200"
                      />
                    </div>

                    {/* === Submit Button === */}
                    <button
                      type="submit"
                      className="w-full bg-[#4640DE] text-white py-3.5 font-bold text-base rounded-xl hover:bg-[#3530C9] hover:shadow-lg hover:shadow-[#4640DE]/25 transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      <Send size={18} />
                      Submit Application
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailPage;
