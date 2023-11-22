import express from "express";
import { createUsersTable } from "./userDal";
import { registerController, loginController } from "./userController";
import { validateUser } from "../validation/validation";

export const userRouter = express.Router();

userRouter.post("/register", validateUser, registerController);
userRouter.post("/login", validateUser, loginController);
