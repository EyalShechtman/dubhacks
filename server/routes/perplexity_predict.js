const express = require('express');
const { predictedBudget } = require('../perplexity');
const { Transaction, User } = require('../models/User');
const router = express.Router();

router.post('/perplexity_predict', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        const transactions = await Transaction.find({ user: user._id });
        const fake= [{ user: user._id, vendor_name: "Chick-Fil-A", category: "Food", amount: 21.24, date: new Date('2024-08-07'), location: 'Seattle, WA' },
        { user: user._id, vendor_name: "McDonalds", category: "Food", amount: 13.43, date: new Date('2024-09-10'), location: 'Renton, WA' },
        { user: user._id, vendor_name: "Safeway Gas Station", category: "Travel", amount: 40.00, date: new Date('2024-09-11'), location: 'Kent, WA' },
        { user: user._id, vendor_name: "Walgreens", category: "Health", amount: 103.93, date: new Date('2024-04-12'), location: 'Chicago, IL' },
        { user: user._id, vendor_name: "Dave & Busters Co.", category: "Other", amount: 150.56, date: new Date('2024-05-07'), location: 'Chicago, IL' },
        { user: user._id, vendor_name: "Copley Memorial Hospital", category: "Health", amount: 976.95, date: new Date('2024-05-08'), location: 'Aurora, IL' }]
        if(!transactions){
            const pred=await predictedBudget(fake,user);
            if (pred.success) {
                res.status(200).json({ budget: prediction.completion });
            } else {
                res.status(500).json({ message: 'Failed to predict budget', error: prediction.error });
            }

        }
        else{
        const prediction = await predictedBudget(transactions, user);
        if (prediction.success) {
            res.status(200).json({ budget: prediction.completion });
        } else {
            res.status(500).json({ message: 'Failed to predict budget', error: prediction.error });
        }
        }
    } catch (error) {
        console.error('Error in perplexity_predict endpoint:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;