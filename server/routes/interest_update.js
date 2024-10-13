const express = require('express');
const { User } = require('../models/User');
const router = express.Router();



router.post('/interest_update', async (req, res) => {
    try {
        const { email, interests } = req.body;
        const updateUser = await User.findOneAndUpdate(email,
            { interests: interests.join(', ') },
            { new: true, runValidators: true });
        if (!updateUser) {
            return res.status(404).json({ success: false, message: 'user not found' });
        }
        res.status(200).json({ success: true, message: 'Updated interests', interests: updateUser.interests });
    }
    catch (error) {
        console.error('Error updating interests ', error);
        res.status(500).json({ success: false, message: 'failed to update interests', error: error.message });
    }
});

module.exports = router;