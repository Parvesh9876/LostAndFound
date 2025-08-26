const express = require('express');
const router = express.Router();
const multer = require('multer');
const Post = require('../models/newPost');
const { verifyToken } = require('../authentication/jwt');

// Multer config: Store image in memory as buffer (base64 format)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// PUT /api/posts/:id - Update Post
router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const postId = req.params.id;
    const { description } = req.body;
    const imageBase64 = req.file ? req.file.buffer.toString('base64') : null;

    // 1. Fetch the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // 2. Ensure current user is the owner
    if (post.postedBy !== req.username.username) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    // 3. Build update fields
    const updates = {};
    if (description) updates.description = description;
    if (imageBase64) updates.imageUrl = imageBase64;

    // 4. Update the post
    const updatedPost = await Post.findByIdAndUpdate(postId, { $set: updates }, { new: true });

    res.json({ message: 'Post updated successfully', post: updatedPost });

  } catch (error) {
    console.error('Update Post Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
