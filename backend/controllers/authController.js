const jwt = require("jsonwebtoken");
const User = require("../models/User");

// === Generate JWT Token ===
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );
};

// === @route   POST /api/auth/signup ===
// === @desc    Register a new user ===
// === @access  Public ===
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // === Check if user already exists ===
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    // === Create new user ===
    const user = await User.create({ name, email, password, role: "user" });

    // === Generate token ===
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// === @route   POST /api/auth/login ===
// === @desc    Authenticate user & get token ===
// === @access  Public ===
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // === Find user by email ===
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // === Compare passwords ===
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // === Generate token ===
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// === @route   GET /api/auth/me ===
// === @desc    Get current authenticated user ===
// === @access  Private ===
const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
        },
      },
    });
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { signup, login, getMe };
