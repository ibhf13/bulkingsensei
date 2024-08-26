import express from "express";
import dotenv from "dotenv";
import connectMongooseDB from "./config/mongoose.js";
import cors from "cors";
import userRouter from "./api/users/userRoutes.js";
import exerciseRouter from "./api/exercises/exerciseRoutes.js";
import routineRouter from "./api/routines/routineRoutes.js";
import historyRouter from "./api/history/historyRoutes.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Connect Database
connectMongooseDB();

// Init Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the uploads directory
app.use("/uploads", express.static(join(__dirname, "uploads")));
// app.use("/uploads", express.static("uploads"));

// Define Routes
app.use("/api/users", userRouter);
app.use("/api/exercises", exerciseRouter);
app.use("/api/routines", routineRouter);
app.use("/api/history", historyRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default async (req, res) => {
  await app(req, res);
};
