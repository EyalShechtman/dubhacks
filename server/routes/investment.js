const express = require('express');
const { User } = require('../models/User');
const router = express.Router();

router.get('/get-investment', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ investmentPortfolio: existingUser.investmentPortfolio });
});

router.post('/investment', async (req, res) => {
    try {
        const { email, investmentComfort, investmentType } = req.body;
        const updateUser = await User.findOneAndUpdate(
            { email: email },  // Change the filter to be an object
            { investmentPortfolio: { investmentComfort, investmentType } },
            { new: true, runValidators: true }
        );
        if (!updateUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'Updated investment', investmentPortfolio: updateUser.investmentPortfolio });
    }
    catch (error) {
        console.error('Error updating investment', error);
        res.status(500).json({ success: false, message: 'Failed to update investment', error: error.message });
    }
});

module.exports = router;
