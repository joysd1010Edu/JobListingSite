const express = require("express");
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
  applyToJob,
  getAdminJobs,
} = require("../controllers/jobController");
const { auth, adminOnly, userOnly } = require("../middleware/auth");
const {
  validateJob,
  validateApplication,
  validateMongoId,
} = require("../middleware/validate");

// === Public Routes ===
router.get("/", getJobs);

// === Admin Routes (must be before /:id to avoid conflicts) ===
router.get("/admin/all", auth, adminOnly, getAdminJobs);
router.post("/", auth, adminOnly, validateJob, createJob);
router.delete("/:id", auth, adminOnly, validateMongoId, deleteJob);

// === Public Route (after /admin/all) ===
router.get("/:id", validateMongoId, getJobById);

// === User Routes (must be logged in as user) ===
router.post("/:id/apply", auth, userOnly, validateApplication, applyToJob);

module.exports = router;
