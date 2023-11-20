import express from "express";
import { registerController } from "./userController";
const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login");

export default userRouter;
