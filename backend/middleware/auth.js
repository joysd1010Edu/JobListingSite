const jwt = require("jsonwebtoken");
const User = require("../models/User");

// === Verify JWT Token ===
const auth = async (req, res, next) => {
  try {
    // === Extract token from header ===
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    // === Verify token ===
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // === Find user ===
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Token is invalid. User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Token has expired." });
    }
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
};

// === Require Admin Role ===
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res
    .status(403)
    .json({ success: false, message: "Access denied. Admins only." });
};

// === Require User Role (not admin) ===
const userOnly = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    return next();
  }
  return res
    .status(403)
    .json({ success: false, message: "Access denied. Users only." });
};

module.exports = { auth, adminOnly, userOnly };
