

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

let otpStore = {};

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Check user existence
router.post('/check-user', async (req, res) => {
  try {
    const { email, mobile } = req.body;
    const user = await User.findOne({ $or: [{ email }, { mobile }] });
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by email
router.post('/get-user', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Send OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code for ',
      text: `Register Atto cars Your OTP code is: ${otp}`
    });

    res.json({ message: 'OTP sent' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (otpStore[email] !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    delete otpStore[email];
    
    // Generate token
    const user = await User.findOne({ email });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.json({ message: 'OTP verified', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, mobile, address } = req.body;
    
    // Validate input
    if (!name || !email || !mobile || !address) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { mobile }] 
    });
    
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: 'User already exists',
        exists: true
      });
    }

    // Create new user
    const newUser = new User({ 
      name, 
      email, 
      mobile, 
      address 
    });
    
    await newUser.save();
    
    res.status(201).json({ 
      success: true,
      message: 'User registered successfully',
      userId: newUser._id
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, mobile } = req.body;
    const user = await User.findOne({ email, mobile });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.json({
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;