


const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");


let otpStore = {}; // In-memory OTP storage

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Check if user exists
router.post("/check-user", async (req, res) => {
  try {
    const { email, mobile } = req.body;
    const user = await User.findOne({ $or: [{ email }, { mobile }] });
    res.json({ exists: !!user });
  } catch (error) {
    console.error("Check user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Send OTP
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP send error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!otpStore[email] || otpStore[email] !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    
    delete otpStore[email];
    
    // Check if user exists to determine if this is registration or login
    const user = await User.findOne({ email });
    let token = null;
    
    if (user) {
      token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    }
    
    res.json({ 
      success: true, 
      message: "OTP verified", 
      token,
      isRegistered: !!user
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ success: false, message: "OTP verification failed" });
  }
});

// Register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, address } = req.body;
    
    // Validation
    if (!name || !email || !mobile || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({ name, email, mobile, address });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ 
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address
      },
      token
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, mobile } = req.body;
    
    // Find user by email and mobile
    const user = await User.findOne({ email, mobile });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ 
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address
      },
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// Get current user profile
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token required" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-__v");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ 
      success: true,
      user 
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

// Verify token validity
router.get("/verify-token", (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.json({ valid: false });
    }

    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true });
  } catch (error) {
    res.json({ valid: false });
  }
});

module.exports = router;