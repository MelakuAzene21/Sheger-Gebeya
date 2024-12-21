//middleware/authMiddleWare.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const mongoose = require('mongoose')
exports.protect = async (req, res, next) => {
    let token;

    // Check if token exists in cookies
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Validate ObjectId
        if (!mongoose.isValidObjectId(decoded.id)) {
            return res.status(400).json({ message: 'Invalid token payload' });
        }
        // Attach user to request object
        req.user = await User.findById(decoded.id).select('-password');

        next();
    } catch (error) {
        console.error('Error decoding token:', error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};


exports.admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};


exports.subAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'subAdmin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

