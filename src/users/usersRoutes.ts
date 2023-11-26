import express from "express";
import { registerController,loginController,deleteUserByUserEmail } from "./userController";
import { validateUser }  from "../validation/validation";
import { limiter } from '../rateLimiter/rateLimiter'; 
export const userRouter = express.Router();

userRouter.post("/register", validateUser, registerController);
userRouter.post("/login",limiter, validateUser, loginController);
userRouter.delete("/:userEmail",deleteUserByUserEmail)
