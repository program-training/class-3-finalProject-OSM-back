import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from 'dotenv';
import { checkConnection } from "./PostgreSQL/PostgreSQL";
import connectToDatabase from "./mongoDB/mongoConnection";
import { userResolvers } from './users/userResolvers';
import { resolvers } from "./resolvers/resolvers";
import { typeDefs } from "./schema/schema";
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http'
import { startStandaloneServer } from '@apollo/server/standalone';
dotenv.config();

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
const httpServer = http.createServer(app);
interface Context {
  token?: string;
}
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers, 
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
const PORT = process.env.PORT;

const start = async () => {
  await server.start();
  app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    morgan("tiny"),
    expressMiddleware(server),
  )

  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  await checkConnection();
  // await connectToDatabase();
}
start()