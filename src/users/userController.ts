import { Request, Response, NextFunction } from "express";
import { UserInterface } from "../interfaces/userInterface";
import {
  registerService,
  loginService,
  forgotPasswordService,
  resetPasswordService,
  deleteUserByEmailService,
  getAllUsersService,
  comperepasswordService,
} from "./userService";
import { validateUser } from "../validation/validation";
import { generateUserPassword } from "../bycrypt/bycrypt";
import * as JWT from "../jwt/jwt";
import { generateUniqueCode } from "../nodemailer/nodemailer";
import { sendemail } from "../nodemailer/nodemailer";

export const registerController = async (req: Request, res: Response) => {
  try {
    const registerUser: UserInterface = req.body;
    registerUser.password = generateUserPassword(registerUser.password);
    const user = await registerService(registerUser);
    if (user) {
      const accessToken = JWT.generateAccessToken(user);
      const refreshToken = JWT.generateRefreshToken(user);
      JWT.refreshTokens.push(refreshToken);
      return res.status(200).json({
        users: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      return res.status(404).json({ message: "No Users found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while retrieving users" });
  }
};
export const forgotPassword = async (req: Request, res: Response) => {
  const emailToReset = req.body.emailInput;
  console.log(emailToReset, "emailtoreset");
  const code = generateUniqueCode();
  try {
    sendemail(emailToReset, code);
    const result = forgotPasswordService(emailToReset, code);
    res.send("Email sent with instructions to reset your password.");
  } catch (error) {
    console.error("Error sending email", error);
    res.status(500).send("Internal Server Error");
  }
};
export const comperepassword = async (req: Request, res: Response) => {
  const emailToReset = req.body.email;
  const code = req.body.code;
  try {
    const result = comperepasswordService(emailToReset, code);
    res.send("sucsess");
  } catch (error) {
    console.error("Error ", error);
    res.status(500).send("Internal Server Error");
  }
};
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await resetPasswordService(email, password);
    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const logInUser: UserInterface = req.body;
    console.log(logInUser);
    const user = await loginService(logInUser);
    console.log(user);
    if (user) {
      const accessToken = JWT.generateAccessToken(user);
      console.log(accessToken);
      const refreshToken = JWT.generateRefreshToken(user);
      JWT.refreshTokens.push(refreshToken);
      return res
        .status(200)
        .json({
          users: user,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
    }
    return res.status(404).json({ message: "Incorrect email or password" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error while retrieving users" });
  }
};

export const deleteUserByUserEmail = async (req: Request, res: Response) => {
  try {
    const userEmail = req.params.userEmail;
    const deleteUserEmail = await deleteUserByEmailService(userEmail);
    res.send({ message: "user deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error while delete user" });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const allUsers = await getAllUsersService();
    res.status(200).json({ users: allUsers });
  } catch (error) {
    res.status(500).json({ error: "Server error while get all users" });
  }
};
