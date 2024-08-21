import express from "express";
import {
  recordSession,
  getAllSessions,
  getSessionById,
} from "../controllers/historyController.js";
import auth from "../middleware/auth.js";

const historyRouter = express.Router();
historyRouter.post("/", auth, recordSession);
historyRouter.get("/", auth, getAllSessions);
historyRouter.get("/:id", auth, getSessionById);

export default historyRouter;
