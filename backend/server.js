import express from 'express'
import dotenv from 'dotenv'
import { router } from './router/auth-router.js'
import { connectToDatabase } from './config/db.js';
import avatarRouter from './router/avatar-router.js'
import userRouter from "./router/user-router.js"
const app = express();
import cors from 'cors'

dotenv.config();

const corsOptions = {
    origin: 'http://localhost:5173',
    method: 'GET, POST, DELETE, PATCH, HEAD',
    Credentials: true,
    allowedHeaders: 'Content-Type, Authorization'
}

app.use(cors(corsOptions))

app.get("/", (req, res) => {
    res.status(200).send("This is AVVISE Backend Server")
})

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/auth", router)
app.use("/api/avatar", avatarRouter)
app.use("/api/user", userRouter)


connectToDatabase().then(() => {

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})