const express = require('express');
const { predictedBudget } = require('./perplexity'); 
const { Transaction, User } = require('./models/User'); 
const router = express.Router();

router.post('/predicted-budget', async (req, res) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

     
        const transactions = await Transaction.find({ user: user._id });

        const prediction = await predictedBudget(transactions, user);

        if (prediction.success) {
            res.status(200).json({ budget: prediction.completion });
        } else {
            res.status(500).json({ message: 'Failed to predict budget', error: prediction.error });
        }
    } catch (error) {
        console.error('Error in predicted-budget endpoint:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;