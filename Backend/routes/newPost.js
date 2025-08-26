const express = require('express');
const multer = require('multer');
const Post = require('../models/newPost');
const router = express.Router();
const { verifyToken } = require('../authentication/jwt');

// Multer setup with memory storage + file size limit (1MB)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB max
});

router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { description } = req.body;

    if (!description || !req.file) {
      return res.status(400).json({ message: 'Description and image are required' });
    }

    const imageBuffer = req.file.buffer.toString('base64');

    const newPost = new Post({
      description,
      imageUrl: imageBuffer,
      postedBy: req.username.username, // From JWT middleware
    });

    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Server error while creating post' });
  }
});

module.exports = router;
