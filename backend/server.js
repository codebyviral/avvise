import express from "express";
import dotenv from "dotenv";
import { router } from "./router/auth-router.js";
import { connectToDatabase } from "./config/db.js";
import avatarRouter from "./router/avatar-router.js";
import userRouter from "./router/user-router.js";
import usersRouter from "./router/users-router.js";
import { User } from "./models/user-model.js";
import admin from "firebase-admin";
const app = express();
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 8000;
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS blocked for origin:" + origin));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "cache-control",
    "svix-id",
    "svix-timestamp",
    "svix-signature",
  ],
};

app.get("/", (req, res) => {
  res.status(200).send("This is AVVISE Backend Server");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api/auth", router);
app.use("/api/avatar", avatarRouter);
app.use("/api/user", userRouter);
app.use("/api/users", usersRouter);

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

async function verifyToken(req, res, next) {
  const idToken = req.headers.authorization;
  if (!idToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
app.use(verifyToken);

export { verifyToken };
export default app;
