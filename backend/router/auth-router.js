import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { signupSchema, loginSchema } from '../validators/validate-middleware.js';
import { validate } from '../middleware/validate-middleware.js';
import { authControllers } from '../controllers/auth-controller.js';
import multer from 'multer';
import dotenv from 'dotenv'
import { User } from '../models/user-model.js';

const router = express.Router();

dotenv.config();

router.get('/', (req, res) => {
    res.status(200).send(`This is Avvise backend`);
});

router.route("/signup").post(validate(signupSchema), authControllers.signup);
router.route("/login").post(validate(loginSchema), authControllers.login);
router.route("/google").post(authControllers.loginWithGoogle)


// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder to save the files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/upload-avatar', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const userId = req.body.userId;

        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Update user's avatar URL in the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        user.avatar = result.secure_url;
        await user.save();

        // Respond with Cloudinary image URL
        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

export { router };
