const Job = require("../models/Job");

// === @route   GET /api/jobs ===
// === @desc    Get all jobs (public — no applicants data) ===
// === @access  Public ===
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .select("-applicants")
      .sort({ postedDate: -1 });

    // === Format response to match frontend interface ===
    const formattedJobs = jobs.map((job) => ({
      id: job._id,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      category: job.category,
      description: job.description,
      requirements: job.requirements || "",
      skills: job.skills || "",
      education: job.education || "",
      benefits: job.benefits || "",
      companyDetails: job.companyDetails || "",
      salary: job.salary,
      tags: job.tags,
      postedDate: job.postedDate.toISOString().split("T")[0],
    }));

    res.status(200).json({
      success: true,
      count: formattedJobs.length,
      data: formattedJobs,
    });
  } catch (error) {
    console.error("Get jobs error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// === @route   GET /api/jobs/:id ===
// === @desc    Get single job by ID (public — no applicants data) ===
// === @access  Public ===
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).select("-applicants");
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        id: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        category: job.category,
        description: job.description,
        requirements: job.requirements || "",
        skills: job.skills || "",
        education: job.education || "",
        benefits: job.benefits || "",
        companyDetails: job.companyDetails || "",
        salary: job.salary,
        tags: job.tags,
        postedDate: job.postedDate.toISOString().split("T")[0],
      },
    });
  } catch (error) {
    console.error("Get job by ID error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// === @route   POST /api/jobs ===
// === @desc    Create a new job listing ===
// === @access  Private (Admin only) ===
const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      type,
      category,
      description,
      requirements,
      skills,
      education,
      benefits,
      companyDetails,
      salary,
      tags,
    } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      type,
      category,
      description,
      requirements: requirements || "",
      skills: skills || "",
      education: education || "",
      benefits: benefits || "",
      companyDetails: companyDetails || "",
      salary,
      tags,
      postedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: {
        id: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        category: job.category,
        description: job.description,
        requirements: job.requirements,
        skills: job.skills,
        education: job.education,
        benefits: job.benefits,
        companyDetails: job.companyDetails,
        salary: job.salary,
        tags: job.tags,
        postedDate: job.postedDate.toISOString().split("T")[0],
        applicants: [],
      },
    });
  } catch (error) {
    console.error("Create job error:", error);

    // === Handle Mongoose validation errors ===
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: messages,
      });
    }

    res.status(500).json({ success: false, message: "Server error" });
  }
};

// === @route   DELETE /api/jobs/:id ===
// === @desc    Delete a job listing ===
// === @access  Private (Admin only) ===
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: `"${job.title}" has been deleted`,
    });
  } catch (error) {
    console.error("Delete job error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// === @route   POST /api/jobs/:id/apply ===
// === @desc    Apply to a job ===
// === @access  Private (User only) ===
const applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // === Check if user already applied ===
    const alreadyApplied = job.applicants.some(
      (applicant) => applicant.userId.toString() === req.user._id.toString(),
    );
    if (alreadyApplied) {
      return res
        .status(400)
        .json({
          success: false,
          message: "You have already applied to this job",
        });
    }

    const { name, email, resumeLink, coverNote } = req.body;

    // === Add application ===
    job.applicants.push({
      userId: req.user._id,
      name,
      email,
      resumeLink,
      coverNote,
      appliedDate: new Date(),
    });

    await job.save();

    res.status(201).json({
      success: true,
      message: `Application submitted for ${job.title} at ${job.company}!`,
    });
  } catch (error) {
    console.error("Apply to job error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// === @route   GET /api/admin/jobs ===
// === @desc    Get all jobs with applicant data (admin) ===
// === @access  Private (Admin only) ===
const getAdminJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedDate: -1 });

    const formattedJobs = jobs.map((job) => ({
      id: job._id,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      category: job.category,
      description: job.description,
      requirements: job.requirements || "",
      skills: job.skills || "",
      education: job.education || "",
      benefits: job.benefits || "",
      companyDetails: job.companyDetails || "",
      salary: job.salary,
      tags: job.tags,
      postedDate: job.postedDate.toISOString().split("T")[0],
      applicants: job.applicants.map((a) => ({
        name: a.name,
        email: a.email,
        resumeLink: a.resumeLink,
        coverNote: a.coverNote,
        appliedDate: a.appliedDate
          ? a.appliedDate.toISOString().split("T")[0]
          : "",
      })),
      applicantCount: job.applicants.length,
    }));

    res.status(200).json({
      success: true,
      count: formattedJobs.length,
      data: formattedJobs,
    });
  } catch (error) {
    console.error("Get admin jobs error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
  applyToJob,
  getAdminJobs,
};
