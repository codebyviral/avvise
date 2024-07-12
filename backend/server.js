import express from 'express'
import dotenv from 'dotenv'
import { router } from './router/auth-router.js'
import { connectToDatabase } from './config/db.js';
const app = express();
import cors from 'cors'
dotenv.config();

const corsOptions = {
    origin: 'https://avvise.vercel.app',
    method: 'GET,POST,DELETE,PATCH,HEAD',
    Credentials: true,
}

app.use(cors(corsOptions))

app.get("/", (req, res) => {
    res.status(200).send("This is AVVISE Backend Server")
})

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/auth", router)

connectToDatabase().then(() => {

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})