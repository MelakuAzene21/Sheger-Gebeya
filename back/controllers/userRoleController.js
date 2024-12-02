const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Import User model
const { protect, admin } = require('../middleware/authMiddleware'); // Import middleware

// Update user role by ID
router.put('/:id', protect, admin, async (req, res) => {
    const { id } = req.params; // Extract user ID from the URL
    const { role } = req.body; // Extract the role from the request body

    try {
        const validRoles = ['user', 'admin', 'subAdmin']; // Define valid roles
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.status(200).json({ message: 'User role updated successfully', user });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
