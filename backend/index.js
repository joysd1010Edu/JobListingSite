// === Load Environment Variables ===
require("dotenv").config();

// === Dependencies ===
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const seedAdmin = require("./config/seed");

// === Route Imports ===
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

// === Initialize Express App ===
const app = express();
const PORT = process.env.PORT || 5000;

// === Middleware ===
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// === API Routes ===
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// === Health Check Route ===
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "QuickHire API is running",
    timestamp: new Date().toISOString(),
  });
});

// === 404 Handler ===
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// === Global Error Handler ===
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// === Start Server ===
const startServer = async () => {
  try {
    // === Connect to MongoDB ===
    await connectDB();

    // === Seed default admin account ===
    await seedAdmin();

    // === Listen on port ===
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📋 API Health: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
