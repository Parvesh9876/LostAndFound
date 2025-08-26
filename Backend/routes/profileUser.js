const express = require('express');
const router = express.Router();
const User = require('../models/signup');
const { verifyToken } = require('../authentication/jwt');
const bcrypt = require('bcrypt');

// ✅ GET: Fetch profile
router.get('/', verifyToken, async (req, res) => {
  try {
    const username = req.username.username;

    const user = await User.findOne({ username }).select('-password'); // Hide password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔐 PUT: Change password (secure version using bcrypt)
router.put('/change-password', verifyToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const username = req.username.username;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // ✅ Compare old password with hashed password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect current password' });
    }

    // ✅ Hash and update new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Password change error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
