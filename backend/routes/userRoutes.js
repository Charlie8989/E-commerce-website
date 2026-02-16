import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  gLogin,
  getNotifications
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/google-login", gLogin);
userRouter.post("/notification",  getNotifications);


export default userRouter;
