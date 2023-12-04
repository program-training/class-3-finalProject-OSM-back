// src/server.ts
import express from 'express';
import http from 'http'; // Import the HTTP module

import userRouter from './users/usersRoutes';
import orderRouter from './orders/orderRoutes';
import chalk from 'chalk';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { checkConnection } from './PostgreSQL/PostgreSQL';
import connectToDatabase from './mongoDB/mongoConnection';

dotenv.config();
const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const server = http.createServer(app); // Create an HTTP server

const PORT = process.env.PORT;

server.listen(PORT, async () => {
  console.log(chalk.blueBright(`Server listening on port: ${PORT}`));
  checkConnection();
  connectToDatabase();
});

export default server; // Export the server object

