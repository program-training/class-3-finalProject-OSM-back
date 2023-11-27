import express from "express";
import { registerController,loginController,
    deleteUserByUserEmail,forgotPassword,resetPassword,
    getAllUsersController,comperepassword } from "./userController";
import { validateUser }  from "../validation/validation";
import { limiter } from '../rateLimiter/rateLimiter'; 
import { verifyAdminToken } from "../jwt/jwt";
export const userRouter = express.Router();

userRouter.get('/',verifyAdminToken,getAllUsersController)
userRouter.post("/register", validateUser, registerController);
userRouter.post("/login",limiter, validateUser, loginController);
userRouter.post('/forgotpassword',forgotPassword)
userRouter.post('/comparepassword',comperepassword)
userRouter.post('/resetpaasword',resetPassword)
userRouter.delete("/:userEmail",deleteUserByUserEmail);
