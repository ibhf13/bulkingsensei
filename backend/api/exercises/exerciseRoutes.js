import express from "express";
import {
  getAllExercises,
  getExerciseById,
} from "../../controllers/exerciseController.js";

const exerciseRouter = express.Router();

exerciseRouter.get("/", getAllExercises);
exerciseRouter.get("/:id", getExerciseById);

export default exerciseRouter;
