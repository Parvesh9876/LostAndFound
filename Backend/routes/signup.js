const express = require('express');
const router = express.Router();
const User = require('../models/signup');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../authentication/jwt');

// POST /api/signup
router.post('/', async (req, res) => {
  try {
    const { username, password, mobileNumber } = req.body;

    // Basic validation
    if (!username || !password || !mobileNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const newUser = new User({ username, password: hashedPassword, mobileNumber });
    await newUser.save();

    // Generate token
    const token = generateToken({ username });

    res.status(201).json({
      message: 'User registered successfully',
      user: { username, mobileNumber },
      token
    });

  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: `Server error`, error: error.message });
  }
});

module.exports = router;
