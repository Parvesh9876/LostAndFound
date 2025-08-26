const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: false // Optional image
  },
  postedBy: {
    type: String,
    ref: 'User',
    required: true
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
  Founded: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Post', postSchema);
