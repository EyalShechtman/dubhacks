const express = require('express');
const router = express.Router();
const { User, Transaction } = require('../models/User');

const goals = [
    { destination: 'Japan', cost: 4500 },
    { destination: 'France', cost: 3200 },
    { destination: 'Brazil', cost: 1800 },
];

router.get('/get-intrests', async (req, res) => {

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ interests: existingUser.interests });
});

router.post('/init-account', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // If no user exists with the email, create a new user
        let user = new User({ email: email, recommendations: goals });

        await user.save();

        res.status(201).json({ message: 'User account created successfully' });
    } catch (err) {
        console.error('Error creating user account:', err);
        res.status(500).json({ error: 'Failed to create user account' });
    }
});


// POST route to create a user with credit card information, budget, transactions, and investment portfolio
router.post('/create', async (req, res) => {
    try {
        const { email, password, creditCard, budget, transactions, investmentPortfolio, income, interests, goals } = req.body;

        // Create new user with email and password
        const newUser = new User({
            email,
            password,
            income,
            interests,
            goals: [],
            wallet: 0,
            creditCard: {
                number: creditCard.number,
                expiryDate: creditCard.expiryDate,
                cvv: creditCard.cvv
            },
            budget: {
                food: { max: budget.food.max, spent: budget.food.spent },
                travel: { max: budget.travel.max, spent: budget.travel.spent },
                health: { max: budget.health.max, spent: budget.health.spent },
                other: { max: budget.other.max, spent: budget.other.spent }
            },
            investmentPortfolio: {
                investmentComfort: investmentPortfolio.investmentComfort,
                investmentType: investmentPortfolio.investmentType
            }
        });

        // Save the user to the database
        await newUser.save();

        // Create and save transactions for the user
        for (const trans of transactions) {
            const newTransaction = new Transaction({
                user: newUser._id,
                vendor_name: trans.vendor_name,
                category: trans.category,
                amount: trans.amount,
                date: trans.date,
                location: trans.location
            });
            await newTransaction.save();
        }

        res.status(201).json({ message: 'User and transactions created successfully' });
    } catch (err) {
        console.error('Error creating user or transactions:', err);
        res.status(500).json({ error: 'Failed to create user' });
    }
});



module.exports = router;
