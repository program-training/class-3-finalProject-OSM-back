import express from "express";
import  userRouter  from "./users/usersRoutes";
import orderRouter from "./orders/orderRoutes";
import chalk from "chalk";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from 'dotenv';
import {checkConnection} from "./PostgreSQL/PostgreSQL";
import connectToDatabase from "./mongoDB/mongoConnection";
import corsHandler from "./cors/cors";
dotenv.config();
const app = express();
app.use(corsHandler);
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(chalk.blueBright(`Server listening on port: ${PORT}`));
  checkConnection()
  connectToDatabase();
});
export default app;
