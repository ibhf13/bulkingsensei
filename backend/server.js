import express from "express";
import dotenv from "dotenv";
import connectMongooseDB from "./config/mongoose.js";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import exerciseRouter from "./routes/exerciseRoutes.js";
import routineRouter from "./routes/routineRoutes.js";
import historyRouter from "./routes/historyRoutes.js";

dotenv.config();

const app = express();

// Connect Database
connectMongooseDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/exercises", exerciseRouter);
app.use("/api/routines", routineRouter);
app.use("/api/history", historyRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
