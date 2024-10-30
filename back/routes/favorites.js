// routes/favorites.js
const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorite');

// Add item to favorites
router.post('/:userId/:itemId', async (req, res) => {
    const { userId, itemId } = req.params;

    try {
        const favorite = new Favorite({ userId, itemId });
        await favorite.save();
        res.status(201).json({ message: 'Item added to favorites' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to favorites', error });
    }
});

// Remove item from favorites
router.delete('/:userId/:itemId', async (req, res) => {
    const { userId, itemId } = req.params;

    try {
        await Favorite.deleteOne({ userId, itemId });
        res.status(200).json({ message: 'Item removed from favorites' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from favorites', error });
    }
});

// Get favorite items for a user
router.get('/:userId/:itemId', async (req, res) => {
    const { userId, itemId } = req.params;

    try {
        const favorites = await Favorite.find({ userId, itemId });
        res.status(200).json(favorites);
    } catch (error) {
        console.error('Error retrieving favorites:', error);
        res.status(500).json({ message: 'Error retrieving favorites', error });
    }
});

// Get all favorite items for a user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const favorites = await Favorite.find({ userId });
        res.status(200).json(favorites);
    } catch (error) {
        console.error('Error retrieving favorites:', error);
        res.status(500).json({ message: 'Error retrieving favorites', error });
    }
});

module.exports = router;
