import express from 'express';
import dotenv from 'dotenv'
import { User } from '../models/user-model.js';
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();
const isAuthenticatedAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    console.log("Authorization Header:", authHeader);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized Access' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, { ignoreExpiration: false });
        console.log('Decoded Token:', decoded);
        const user = await User.findById(decoded.userId);
        console.log('is user admin', user.isAdmin);
        console.log('User retrieved:', user);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: "Forbidden Admins Only" })
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized access", error });
    }
}
router.get("/admin", isAuthenticatedAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error.' })
    }
})

export default router