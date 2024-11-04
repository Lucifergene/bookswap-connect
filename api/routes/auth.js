require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load User model
const User = require("../models/User");
const verifyToken = require("./middleware/jwt");

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please enter all required fields." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters." });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({
        error: "Email already in use. Please choose a different one.",
      });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save user to database
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      userId: savedUser._id,
      username: savedUser.username,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An unexpected error occurred. Please try again later." });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please enter both email and password." });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "Login successful",
      userId: user._id,
      username: user.username,
      token: token,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An unexpected error occurred. Please try again later." });
  }
});

// Logout
router.post("/logout", (req, res) => {
  // For JWT-based logout, clear the token on the client-side (localStorage, cookies, etc.)
  // Here we just send a response indicating successful logout
  res.status(200).json({ message: "Logout successful" });
});

// Fetch user details
router.get("/user", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({
      userId: user._id,
      username: user.username,
      email: user.email,
      createDate: user.date,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An unexpected error occurred. Please try again later." });
  }
});

module.exports = router;
