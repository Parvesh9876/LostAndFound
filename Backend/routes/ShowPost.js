const express = require('express');
const router = express.Router();
const Post = require('../models/newPost');
const { verifyToken } = require('../authentication/jwt');

// 🔹 GET all posts (protected)
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Optional: latest first
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// 🔹 GET single post detail (protected)
router.get('/postdetail/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    console.log('✅ Post fetched:', post.postedBy);
    res.status(200).json({ post });
  } catch (err) {
    console.error('❌ Error fetching post:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
