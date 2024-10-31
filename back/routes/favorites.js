// routes/favorites.js
const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorite');

// Add item to favorites (toggle functionality)
router.post('/:userId/:itemId', async (req, res) => {
    const { userId, itemId } = req.params;

    try {
        // Check if the item already exists in the user's favorites
        const existingFavorite = await Favorite.findOne({ userId, itemId });
        if (existingFavorite) {
            // If it exists, remove it (unfavorite)
            await Favorite.deleteOne({ userId, itemId });
            return res.status(200).json({ message: 'Item removed from favorites' });
        } else {
            // If it doesn't exist, add it (favorite)
            const favorite = new Favorite({ userId, itemId });
            await favorite.save();
            return res.status(201).json({ message: 'Item added to favorites' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error toggling favorite', error });
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

// Get all favorite items for a user, including detailed product information
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Populate the `itemId` field with product details (e.g., `name`, `images`, `price`)
        const favorites = await Favorite.find({ userId }).populate('itemId', 'name images price');

        if (favorites.length === 0) {
            return res.status(200).json({ message: 'You have no favorite items yet.' });
        }

        res.status(200).json(favorites);
    } catch (error) {
        console.error('Error retrieving favorites:', error);
        res.status(500).json({ message: 'Error retrieving favorites', error });
    }
});

module.exports = router;
