const User = require("../models/User");

// === Seed Default Admin Account ===
const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME;

    if (!adminEmail || !adminPassword || !adminName) {
      console.log("⚠️  Admin env variables not set, skipping admin seed.");
      return;
    }

    // === Check if admin already exists ===
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("ℹ️  Default admin account already exists.");
      return;
    }

    // === Create admin user ===
    await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    console.log(`✅ Default admin account created: ${adminEmail}`);
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
  }
};

module.exports = seedAdmin;
