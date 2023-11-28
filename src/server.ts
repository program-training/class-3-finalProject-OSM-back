import express from "express";
import { NextFunction, Request, Response } from "express";
import { userRouter } from "./users/usersRoutes";
import orderRouter from "./orders/orderRoutes";
const app = express();
import chalk from "chalk";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from 'dotenv';
import pool from "./PostgreSQL/PostgreSQL";
import connectToDatabase from "./mongoDB/mongoConnection";
import { verifyToken } from "./jwt/jwt";
dotenv.config();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

//authentication
app.use((req:Request,res:Response,next) => {
  const token = req.headers['authorization']
    if (token == null) {
        return res.json(  "no token found"  ).sendStatus(401)
    }
    const secretKey:string=process.env.SECRET_TOKEN_KEY as string
    Jwt.verify(token,secretKey , (err, user ) => {
      if (err) return res.json({ message: "Token verification failed" }).sendStatus(403)
      //get user data from db by id
      req.body.user = user as UserInterface
      
      next()
    })
})


app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(chalk.blueBright(`Server listening on port: ${PORT}`));
  pool;
  connectToDatabase();
});
export default app;
