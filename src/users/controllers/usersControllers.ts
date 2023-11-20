import { register, loginService } from "../services/usersService";
import { handleError } from "../../utils/handleErrors";
import userValidation from "../models/joi/userValidation";
import { Request, Response } from "express";
import { UserInterface, UserLoginInterface } from "../interfaces/UserInterface";

export const handleUserLogin = async (req: Request, res: Response) => {
  try {
    const userFromBody = req.body as UserLoginInterface;
    const user = await loginService(userFromBody);
    return res.send(user);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleUserRegistration = async (req: Request, res: Response) => {
  try {
    const user = req.body as UserInterface;
    console.log(user);
    
    const newUserRecord = await register(user);
    return res.status(201).send(newUserRecord);
  } catch (error) {
    if (error instanceof Error) handleError(res, error);
  }
};