// server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./database/db');
const { verifyToken } = require('./authentication/jwt');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  },
});

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// MongoDB Connection
connectDb();

// Test Route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Import Models



// Other Routes
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const showPostRoutes = require('./routes/ShowPost');
const newPostRoutes = require('./routes/newPost');
const myPostRoutes = require('./routes/mypost');
const updatePostRoutes = require('./routes/updatePost');
const deletePostRoutes = require('./routes/deletePost');
const postByIdRoutes = require('./routes/postByid');
const profileUserRoutes = require('./routes/profileUser');

app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/showpost', showPostRoutes);
app.use('/newpost', newPostRoutes);
app.use('/mypost', myPostRoutes);
app.use('/updatepost', updatePostRoutes);
app.use('/deletepost', deletePostRoutes);
app.use('/postbyid', postByIdRoutes);
app.use('/profile', profileUserRoutes);


// Start Server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
