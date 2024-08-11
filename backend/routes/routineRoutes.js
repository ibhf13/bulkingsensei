import express from "express";
import {
  createRoutine,
  getAllRoutines,
  updateRoutine,
  deleteRoutine,
} from "../controllers/routineController.js";
import auth from "../middleware/auth.js";

const routineRouter = express.Router();
routineRouter.post("/", auth, createRoutine);
routineRouter.get("/", auth, getAllRoutines);
routineRouter.put("/:id", auth, updateRoutine);
routineRouter.delete("/:id", auth, deleteRoutine);

export default routineRouter;
