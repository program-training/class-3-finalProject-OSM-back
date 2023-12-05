import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from 'dotenv';
import { typeDefs } from "./schema/schema";
import { resolvers } from "./resolvers/resolvers";
import { checkConnection } from "./PostgreSQL/PostgreSQL";
import connectToDatabase from "./mongoDB/mongoConnection";
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http'

interface context  {
  token?: string
}

dotenv.config();
const PORT = process.env.PORT as unknown as number;
 
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<context>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
 })

 const start = async () => {
  await server.start();
  app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    morgan("tiny"),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.token
        return {token}
      },
    }),
  )

  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  await checkConnection();
  await connectToDatabase();
}
start()






// const startServer = async () => {
//   try {
//     const { url } = await startStandaloneServer(server, {
//       listen: { port: PORT },
//     });

//     console.log(`Server ready at ${url}`);

//     await checkConnection();
//     await connectToDatabase();
//   } catch (error) {
//     console.error('Error starting the server:', Error);
//   }
// };

// startServer();
//export default app;

