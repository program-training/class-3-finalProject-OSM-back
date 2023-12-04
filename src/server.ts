
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { userResolvers } from './users/userResolvers';
import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from 'dotenv';
import { checkConnection } from "./PostgreSQL/PostgreSQL";
import connectToDatabase from "./mongoDB/mongoConnection";


const app = express();
dotenv.config();
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());


// GraphQL Schema
const schema = buildSchema(`
type User {
  id: ID!
  email: String!
  code: String!
}

type Query {
  getUser(id: ID!): User
  getAllUsers: [User]
}

type Mutation {
  registerUser( email: String!, password: String!): RegisterUserResponse
  loginUser(email: String!, password: String!): RegisterUserResponse
  deleteUser(id: ID!): String
  forgotPassword(email:String!):String
  comperepassword(email:String!,code:String!):String
  resetPassword(email:String!,password:String!):ResetPasswordResponse
}
type RegisterUserResponse {
  user: User
  accessToken: String
}
type ResetPasswordResponse {
  success: Boolean
  message: String
}
`);
const root = {
  getAllUsers: userResolvers.getAllUsers,
  registerUser: userResolvers.registerUser,
  loginUser: userResolvers.login,
  deleteUser: userResolvers.deleteUser,
  forgotPassword:userResolvers.forgotPassword,
  comperepassword:userResolvers.comperepassword,
  resetPassword:userResolvers.resetPassword
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, 
  })
);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
    checkConnection()
  connectToDatabase();
});
