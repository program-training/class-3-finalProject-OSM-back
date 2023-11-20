import express from "express";
import userRouter from "./users/usersRoutes";
const app = express();
import chalk from "chalk";
import cors from "cors";
require('dotenv').config();
import pool from "./PostgreSQL/PostgreSQL";

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);


const PORT = 8181;

app.listen(PORT, async () => {
  console.log(chalk.blueBright(`Server listening on port: ${PORT}`));
   pool
});
