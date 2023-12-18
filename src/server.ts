import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import { typeDefs } from "./schema/schema";
import { resolvers } from "./resolvers/resolvers";
import { checkConnection } from "./PostgreSQL/PostgreSQL";
import connectToDatabase from "./mongoDB/mongoConnection";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import Redis from "ioredis";
import http from "http";
import chalk from "chalk";
import RedisClient from "./redis/redis";
interface context {
  token?: string;
}

dotenv.config();
const PORT = process.env.PORT ;

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<context>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const start = async () => {
  await server.start();
  app.use(
    "/",
    cors<cors.CorsRequest>(),
    express.json(),
    morgan("tiny"),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.token;
        return { token };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(chalk.blueBright(`🚀 Server ready at http://localhost:${PORT}/graphql`));
  await checkConnection();
  // await connectToDatabase();
  RedisClient.connect()
    .then(() =>
      console.log(
        chalk.magentaBright("Connected to Redis🚀🚀")
      )
    )
    .catch((error) => {
      if (error instanceof Error) console.log(error.message);
    });
};
start();
