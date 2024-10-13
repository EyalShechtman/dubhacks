const express = require('express');
const { User } = require('../models/User');
const router = express.Router();



router.post('/investment', async (req, res) => {
    try {
        const { email, investmentComfort,investmentType } = req.body;
        const updateUser = await User.findOneAndUpdate(email,
            { investmentPortfolio:{investmentComfort:investmentComfort,investmentType:investmentType} },
            { new: true, runValidators: true });
        if (!updateUser) {
            return res.status(404).json({ success: false, message: 'user not found' });
        }
        res.status(200).json({ success: true, message: 'Updated investment', investmentPortfolio: updateUser.investmentPortfolio });
    }
    catch (error) {
        console.error('Error updating investment ', error);
        res.status(500).json({ success: false, message: 'failed to update investment', error: error.message });
    }
});

module.exports = router;