import express, { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

import { handleUserLogin, handleUserRegistration } from "../controllers/usersControllers";
const router = express.Router();

router.post("/login", handleUserLogin);
router.post("/register", handleUserRegistration);



export default router;
