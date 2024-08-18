import express from 'express';
import dotenv from 'dotenv'
import { User } from '../models/user-model.js';


dotenv.config();

const router = express.Router();

router.delete("/delete/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
})

router.put("/update/:userId", async (req, res) => {
    const userId = req.params.userId;
    const { newName } = req.body;

    if (!newName) {
        return res.status(400).json({ error: 'New name is required' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.fullName = newName;
        await user.save();
        res.status(200).json({ message: 'Full name updated successfully' });
    } catch (error) {
        console.error('Name update error:', error.message);
        res.status(500).json({ error: 'Failed to update name' });
    }
});

export default router