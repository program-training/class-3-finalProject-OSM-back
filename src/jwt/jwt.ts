import Jwt from "jsonwebtoken"
import { UserInterface } from "../interfaces/userInterface"


export const generateAccessToken=(user:UserInterface)=> {
    return Jwt.sign(user,'secretKey' , { expiresIn: '15s' })
  }

export const generateRefreshToken=(user:UserInterface) => {
    return Jwt.sign(user, 'secretRefreshKey')
  }

export let refreshTokens:string[] = [];