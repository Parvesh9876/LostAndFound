// middleware/jwtAuth.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// ✅ Middleware to verify JWT Token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Save user info in req.user
        req.user = {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
        };

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// ✅ Function to generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d', // Token expires in 7 days
        }
    );
};

module.exports = {
    verifyToken,
    generateToken
};
