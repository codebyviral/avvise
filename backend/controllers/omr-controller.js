import express from 'express';
import { User } from '../models/user-model.js';

const app = express();

app.use(express.json());

const uploadOmr = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    try {
        const omrData = req.body.omrData;
        user.omrData = omrData;
        await user.save();
        res.status(200).json({ message: 'OMR data uploaded successfully' });
    } catch (error) {
        console.log("OMR Upload Error", error);
    }
}

const omrController = { uploadOmr }

export { omrController };
