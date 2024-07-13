import express from 'express'
import multer from 'multer'

import { User } from "../models/user-model.js"

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})

const upload = multer({ storage })


// upload avatar post request

router.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// find avatar url

router.get('/profile/:userId', async (req, res) => {
    const { userId } = req.params
    try {
        const user = await User.findById(userId);
        const avatarUrl = user.avatar
        const fullName = user.fullName
        const email = user.email
        if (!User) {
            res.status(404).json({ message: 'user not found' })
        }
        res.json({ avatarUrl, fullName, email })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

export default router