const express = require('express');
const { User } = require('../models/User');
const router = express.Router();

router.get('/recommended-dest', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ recommendations: existingUser.recommendations });
});

router.post('/move-recommendation-to-goals', async (req, res) => {
    const { email } = req.body;
    const { destination } = req.body;

    if (!email || !destination) {
        return res.status(400).json({ message: 'Email and destination are required' });
    }

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the recommendation to move
        const recommendation = user.recommendations.find(r => r.destination === destination);
        if (!recommendation) {
            return res.status(404).json({ message: 'Recommendation not found' });
        }

        // Remove the recommendation from the recommendations array
        user.recommendations = user.recommendations.filter(r => r.destination !== destination);

        // Add the recommendation to the goals array
        user.goals.push(recommendation);

        // Save the updated user data
        await user.save();

        res.status(200).json({ message: 'Recommendation moved to goals successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});

module.exports = router;
