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
router.get("/:id", validateMongoId, getJobById);

// === User Routes (must be logged in as user) ===
router.post("/:id/apply", auth, userOnly, validateApplication, applyToJob);

// === Admin Routes ===
router.post("/", auth, adminOnly, validateJob, createJob);
router.delete("/:id", auth, adminOnly, validateMongoId, deleteJob);
router.get("/admin/all", auth, adminOnly, getAdminJobs);

module.exports = router;
