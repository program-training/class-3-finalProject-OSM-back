import { Request, Response } from "express";
import Jwt from "jsonwebtoken"
import { UserInterface } from "./userInterface";
import { registerService } from "./userService";


export const registerController = async (req: Request, res: Response) => {
    try {
      const user :UserInterface = req.body;
      const users = await registerService(user);
      const accessToken = Jwt.sign({ users }, 'secretKey', { expiresIn: '1h' });
      const refreshToken = Jwt.sign({ users }, 'secretKey', { expiresIn: '1d' });
      if (users) return res.status(200).header('Authorization',accessToken).json({users : users,refreshToken: refreshToken});
      else {
        return res.status(404).json({ message: "No Users found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error while retrieving users" });
    }
  }