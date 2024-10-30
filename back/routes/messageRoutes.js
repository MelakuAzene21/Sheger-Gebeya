// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Route to handle message submissions
router.post('/submit', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Check if all fields are provided
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        // Create and save the new message
        const newMessage = await Message.create({ name, email, message });

        // Send a success response
        res.status(201).json({ message: 'Message sent successfully', data: newMessage });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/all', async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
});
module.exports = router;
