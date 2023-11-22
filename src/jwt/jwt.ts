import Jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import * as dotenv from 'dotenv'; 
import { UserInterface } from "../interfaces/userInterface"
dotenv.config();


export let refreshTokens:string[] = [];

export const generateAccessToken=(user:UserInterface)=> {
    const secretKey:string=process.env.SECRET_TOKEN_KEY as string
    return Jwt.sign(user, secretKey)
  }

export const generateRefreshToken=(user:UserInterface) => {
    const secretKey:string=process.env.SECRET_REFRESH_TOKEN_KEY as string
    return Jwt.sign(user,secretKey)
  }

  export const verifyToken=(req:Request, res:Response, next:NextFunction) => {
    const token = req.headers['authorization']
    
    if (token == null) {
        return res.sendStatus(401).json(  "no token found"  )
    }
    const secretKey:string=process.env.SECRET_TOKEN_KEY as string
    Jwt.verify(token,secretKey , (err, user ) => {
      console.log(err)
      if (err) return res.sendStatus(403).json({ message: "Token verification failed" })
      req.body.user = user as UserInterface
      next()
    })
  }

  export const refreshToken = (req:Request, res:Response) => {
      const refreshToken = req.body.refreshToken
      if (refreshToken == null){
         return res.sendStatus(401)
      }
      if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403)
      }
      const secretKey:string=process.env.SECRET_REFRESH_TOKEN_KEY as string
      Jwt.verify(refreshToken, secretKey, (err:any, user:any) => {
        if (err) {
          return res.sendStatus(403);
        }
        const accessToken = generateAccessToken(user);
        res.json({ accessToken: accessToken });
      });
}


