import express from "express";
import dotenv from "dotenv";
import connectMongooseDB from "./config/mongoose.js";
import cors from "cors";
import userRouter from "./api/users/userRoutes.js";
import exerciseRouter from "./api/exercises/exerciseRoutes.js";
import routineRouter from "./api/routines/routineRoutes.js";
import historyRouter from "./api/history/historyRoutes.js";

dotenv.config();

const app = express();

// Connect Database
connectMongooseDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/exercises", exerciseRouter);
app.use("/api/routines", routineRouter);
app.use("/api/history", historyRouter);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default async (req, res) => {
  await app(req, res);
};
