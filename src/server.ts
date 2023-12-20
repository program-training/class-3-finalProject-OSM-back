import express from "express";
import  userRouter  from "./users/usersRoutes";
import orderRouter from "./orders/orderRoutes";
import chalk from "chalk";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from 'dotenv';
import { checkConnection } from "./PostgreSQL/PostgreSQL";
import connectToDatabase from "./mongoDB/mongoConnection";
import {createUsersTable} from "./users/usersDal";

dotenv.config();
const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(chalk.blueBright(`Server listening on port: ${PORT}`));
  await checkConnection();
  await connectToDatabase();
  await createUsersTable();
});
export default app;
