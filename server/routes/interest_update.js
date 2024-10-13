const express = require('express');
const { User } = require('../models/User');
const router = express.Router();

router.post('/interest_update', async (req, res) => {
    try {
        const { email, interests } = req.body;

        // Corrected filter parameter to be an object
        const updateUser = await User.findOneAndUpdate(
            { email: email }, // Filter criteria as an object
            { interests: interests.join(', ') }, // Update operation
            { new: true, runValidators: true } // Options for returning the updated doc and running validators
        );

        if (!updateUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'Updated interests', interests: updateUser.interests });
    }
    catch (error) {
        console.error('Error updating interests', error);
        res.status(500).json({ success: false, message: 'Failed to update interests', error: error.message });
    }
});

module.exports = router;
