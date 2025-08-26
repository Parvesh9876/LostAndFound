const express = require('express');
const router = express.Router();
const Posts = require('../models/newPost');
const { verifyToken } = require('../authentication/jwt');

// ✅ Get all posts created by the authenticated user
router.get('/', verifyToken, async (req, res) => {
  try {
    const username = req.username.username;

    const myPosts = await Posts.find({ postedBy: username });

    res.status(200).json({
      success: true,
      count: myPosts.length,
      posts: myPosts
    });
  } catch (err) {
    console.error('Error fetching user posts:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
