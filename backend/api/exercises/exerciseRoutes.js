import express from "express";
import {
  getAllExercises,
  getExerciseById,
  getAllMuscleTypes,
  getExercisesByMuscleType,
} from "../../controllers/exerciseController.js";

const exerciseRouter = express.Router();

exerciseRouter.get("/", getAllExercises);
exerciseRouter.get("/muscle-types", getAllMuscleTypes);
exerciseRouter.get("/muscle-type/:muscleTypeId", getExercisesByMuscleType);
exerciseRouter.get("/:id", getExerciseById);

export default exerciseRouter;
