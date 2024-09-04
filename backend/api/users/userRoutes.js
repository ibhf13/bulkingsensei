import express from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
  updateUser,
  uploadPhoto,
  getPhoto,
} from "../../controllers/userController.js";
import auth from "../../middleware/auth.js";
const userRouter = express.Router();

// Public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected routes
userRouter.get("/info", auth, getUserInfo);
userRouter.put("/update", auth, updateUser);
userRouter.post("/upload-photo", auth, uploadPhoto);
userRouter.get("/photo", auth, getPhoto);

export default userRouter;
