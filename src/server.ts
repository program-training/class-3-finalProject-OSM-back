import express from "express";
import { userRouter } from "./users/usersRoutes";
import orderRouter from "./orders/orderRoutes";
const app = express();
import chalk from "chalk";
import morgan from "morgan";
import cors from "cors";
require("dotenv").config();
import pool from "./PostgreSQL/PostgreSQL";
import connectToDatabase from "./mongoDB/mongoConnection";


app.use(cors());
app.use(morgan('tiny'))
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

// const PORT = process.env.PORT;
const PORT = 8080

app.listen(PORT, async () => {
  console.log(chalk.blueBright(`Server listening on port: ${PORT}`));
   pool
   connectToDatabase(); 
});
export default app;