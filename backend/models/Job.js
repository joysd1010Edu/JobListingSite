const mongoose = require("mongoose");

// === Application Sub-Schema ===
const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Applicant name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Applicant email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    resumeLink: {
      type: String,
      required: [true, "Resume link is required"],
      trim: true,
      match: [/^https?:\/\/.+/, "Please enter a valid URL"],
    },
    coverNote: {
      type: String,
      required: [true, "Cover note is required"],
      trim: true,
      minlength: [10, "Cover note must be at least 10 characters"],
      maxlength: [2000, "Cover note cannot exceed 2000 characters"],
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true },
);

// === Job Schema ===
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minlength: [2, "Company name must be at least 2 characters"],
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      minlength: [2, "Location must be at least 2 characters"],
      maxlength: [100, "Location cannot exceed 100 characters"],
    },
    type: {
      type: String,
      required: [true, "Job type is required"],
      enum: {
        values: ["Full-Time", "Part-Time", "Contract", "Remote", "Internship"],
        message: "Invalid job type",
      },
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: {
        values: [
          "Design",
          "Sales",
          "Marketing",
          "Finance",
          "Technology",
          "Engineering",
          "Business",
          "Human Resource",
        ],
        message: "Invalid category",
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [20, "Description must be at least 20 characters"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    requirements: {
      type: String,
      trim: true,
      maxlength: [5000, "Requirements cannot exceed 5000 characters"],
      default: "",
    },
    skills: {
      type: String,
      trim: true,
      maxlength: [2000, "Skills cannot exceed 2000 characters"],
      default: "",
    },
    education: {
      type: String,
      trim: true,
      maxlength: [2000, "Education cannot exceed 2000 characters"],
      default: "",
    },
    benefits: {
      type: String,
      trim: true,
      maxlength: [5000, "Benefits cannot exceed 5000 characters"],
      default: "",
    },
    companyDetails: {
      type: String,
      trim: true,
      maxlength: [5000, "Company details cannot exceed 5000 characters"],
      default: "",
    },
    salary: {
      type: String,
      required: [true, "Salary is required"],
      trim: true,
      minlength: [3, "Salary must be at least 3 characters"],
      maxlength: [50, "Salary cannot exceed 50 characters"],
    },
    tags: {
      type: [String],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "At least one tag is required",
      },
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicants: [applicationSchema],
  },
  { timestamps: true },
);

// === Virtual for applicant count ===
jobSchema.virtual("applicantCount").get(function () {
  return this.applicants.length;
});

// === Ensure virtuals are included in JSON ===
jobSchema.set("toJSON", { virtuals: true });
jobSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Job", jobSchema);
