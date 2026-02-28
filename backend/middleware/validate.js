const { body, param, validationResult } = require("express-validator");

// === Handle Validation Errors ===
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// === Signup Validation ===
const validateSignup = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be 2-50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  handleValidationErrors,
];

// === Login Validation ===
const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

// === Job Creation Validation ===
const validateJob = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Job title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be 3-100 characters"),
  body("company")
    .trim()
    .notEmpty()
    .withMessage("Company name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Company name must be 2-100 characters"),
  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Location must be 2-100 characters"),
  body("type")
    .trim()
    .notEmpty()
    .withMessage("Job type is required")
    .isIn(["Full-Time", "Part-Time", "Contract", "Remote", "Internship"])
    .withMessage("Invalid job type"),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isIn([
      "Design",
      "Sales",
      "Marketing",
      "Finance",
      "Technology",
      "Engineering",
      "Business",
      "Human Resource",
    ])
    .withMessage("Invalid category"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 20, max: 5000 })
    .withMessage("Description must be 20-5000 characters"),
  body("requirements")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Requirements cannot exceed 5000 characters"),
  body("skills")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Skills cannot exceed 2000 characters"),
  body("education")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Education cannot exceed 2000 characters"),
  body("benefits")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Benefits cannot exceed 5000 characters"),
  body("companyDetails")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Company details cannot exceed 5000 characters"),
  body("salary")
    .trim()
    .notEmpty()
    .withMessage("Salary is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Salary must be 3-50 characters"),
  body("tags").isArray({ min: 1 }).withMessage("At least one tag is required"),
  body("tags.*").trim().notEmpty().withMessage("Tag cannot be empty"),
  handleValidationErrors,
];

// === Job Application Validation ===
const validateApplication = [
  param("id").isMongoId().withMessage("Invalid job ID"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be 2-100 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("resumeLink")
    .trim()
    .notEmpty()
    .withMessage("Resume link is required")
    .custom((value) => {
      try {
        const url = new URL(value);
        if (!["http:", "https:"].includes(url.protocol)) {
          throw new Error("URL must use http or https");
        }
        return true;
      } catch {
        throw new Error("Please enter a valid URL");
      }
    }),
  body("coverNote")
    .trim()
    .notEmpty()
    .withMessage("Cover note is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Cover note must be 10-2000 characters"),
  handleValidationErrors,
];

// === MongoDB ID Validation ===
const validateMongoId = [
  param("id").isMongoId().withMessage("Invalid ID format"),
  handleValidationErrors,
];

module.exports = {
  validateSignup,
  validateLogin,
  validateJob,
  validateApplication,
  validateMongoId,
  handleValidationErrors,
};
