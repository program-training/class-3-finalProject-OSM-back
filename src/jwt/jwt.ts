import Jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import * as dotenv from 'dotenv'; 
import { UserInterface } from "../interfaces/userInterface"
dotenv.config();


export let refreshTokens:string[] = [];

export const generateAccessToken=(user:UserInterface)=> {
    let secretKey=process.env.SECRET_TOKEN_KEY as string
    return Jwt.sign(user, secretKey)
  }

export const generateRefreshToken=(user:UserInterface) => {
    const secretKey:string=process.env.SECRET_REFRESH_TOKEN_KEY as string
    return Jwt.sign(user,secretKey)
  }

  export const verifyToken=(req:Request, res:Response, next:NextFunction) => {
    const token = req.headers['authorization']

    if (token == null) {
        return res.json(  "no token found"  ).sendStatus(401)
    }
    const secretKey:string=process.env.SECRET_TOKEN_KEY as string
    Jwt.verify(token,secretKey , (err, user ) => {
      if (err) return res.json({ message: "Token verification failed" }).sendStatus(403)
      req.body.user = user as UserInterface
      next()
    })
  }

  export const verifyAdminToken=(req:Request, res:Response, next:NextFunction) => {
    const token = req.headers['authorization']
    if (token == null) {
        return res.json( "no token found" ).sendStatus(401)
    }
    const secretKey:string=process.env.SECRET_TOKEN_KEY as string
    Jwt.verify(token,secretKey , (err, user: UserInterface | unknown ) => {
      if (err){
        return res.json({ message: "Token verification failed" }).sendStatus(403)
      }else if((user as UserInterface).isadmin){
        req.body.user = user as UserInterface
        next()
      }else{
        return res.json({ message: "allow only for admin" }).sendStatus(406)
      }
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
      Jwt.verify(refreshToken, secretKey, (err:unknown, user:UserInterface | unknown) => {
        if (err) {
          return res.sendStatus(403);
        }
        
        const accessToken = generateAccessToken(user as UserInterface);
        res.json({ accessToken: accessToken });
      });
}


