import express from "express";
import userRouter from "./users/usersRoutes";
import orderRouter from "./orders/orderRoutes";
const app = express();
import chalk from "chalk";
import cors from "cors";
require("dotenv").config();
import pool from "./PostgreSQL/PostgreSQL";
import connectToDatabase from "./mongoDB/mongoConnection";
import morgan from "./logger/morgan";

app.use(morgan);
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const PORT = 8181;

app.listen(PORT, async () => {
  console.log(chalk.blueBright(`Server listening on port: ${PORT}`));
   pool
   connectToDatabase(); 
});
