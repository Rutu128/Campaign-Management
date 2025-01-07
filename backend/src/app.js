import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
);

// Routes
import authRoutes from "./routes/Auth.routes.js";

app.use("/auth", authRoutes);

export default app;
