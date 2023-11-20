import express, { NextFunction, Request, Response } from "express";
import { Request as ExpressRequest } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends ExpressRequest {
  user?: any;
}

export default function authenticateToken(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (token == null) {
    next();
    return;
  }
  if (process.env.ACCESS_TOKEN_JWT) {
    jwt.verify(token, process.env.ACCESS_TOKEN_JWT, (err, user) => {
      if (err) {
        next();
        return;
      }
      req.user = user;
      next();
    });
  }
}
