import express from "express";
import { createUsersTable } from "./userDal";
import { registerController,loginController } from "./userController";

export const userRouter = express.Router();

userRouter.post("/register",registerController);
userRouter.post('/login',loginController);
