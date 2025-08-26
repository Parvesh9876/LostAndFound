const express = require('express');
const router = express.Router();
const Posts = require('../models/newPost');
const { verifyToken } = require('../authentication/jwt');
const mongoose = require('mongoose');

// Get a post by ID - protected route
router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  // ✅ Validate MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  try {
    const post = await Posts.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ post });
  } catch (err) {
    console.error('❌ Error fetching post:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
