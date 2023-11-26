import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { UserInterface } from "../interfaces/userInterface";
import { registerService, loginService, deleteUserByEmailService } from "./userService";
import { validateUser } from "../validation/validation";
import { generateUserPassword } from "../bycrypt/bycrypt";
import * as JWT from "../jwt/jwt";

export const registerController = async (req: Request, res: Response) => {
  try {
    const registerUser: UserInterface = req.body;
    registerUser.password = generateUserPassword(registerUser.password);
    const user = await registerService(registerUser);
    if (user) {
      const accessToken = JWT.generateAccessToken(user);
      const refreshToken = JWT.generateRefreshToken(user);
      JWT.refreshTokens.push(refreshToken);
      return res
        .status(200)
        .json({
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


  export const loginController = async (req: Request, res: Response) => {
    try {
      const logInUser:UserInterface = req.body;
      const user = await loginService(logInUser);
      if (user) {
        const accessToken = JWT.generateAccessToken(user)
        const refreshToken = JWT.generateRefreshToken(user)
        JWT.refreshTokens.push(refreshToken)
        return res.status(200).json({users : user,accessToken: accessToken,refreshToken: refreshToken});
      }
      return res.status(404).json({ message: "Incorrect email or password" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error while retrieving users" });
    }
};

export const deleteUserByUserEmail = async (req:Request, res:Response) =>{
  try{
    const userEmail = req.params.userEmail
    const deleteUserEmail = await deleteUserByEmailService(userEmail)
    res.send({ message: 'user deleted successfully'})
  }catch(error){
    console.log(error);
    res.status(500).json({ error: "Server error while delete user" })
  }
}