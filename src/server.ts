import express from "express";
const app = express();
import chalk from "chalk";
import cors from "cors";
require('dotenv').config();
import pool from "./PostgreSQL/PostgreSQL";

app.use(cors());
app.use(express.json());


const PORT = 8181;

app.listen(PORT, async () => {
  console.log(chalk.blueBright(`Server listening on port: ${PORT}`));
   pool
});
