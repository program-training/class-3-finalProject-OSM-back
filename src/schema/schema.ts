import { gql } from "graphql-tag";
export const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    code: String!
    password:String!
  }

  type Query {
    getUser(id: Int!): User
    getAllUsers: [User]
  }

  type Mutation {
    registerUser(email: String!, password: String!): RegisterUserResponse
    loginUser(email: String!, password: String!): RegisterUserResponse
    deleteUser(id:Int!): String
    forgotPassword(email: String!): String
    comperepassword(email: String!, code: String!): String
    resetPassword(email: String!, password: String!): ResetPasswordResponse
  }

  type RegisterUserResponse {
    user: User
    accessToken: String
  }

  type ResetPasswordResponse {
    success: Boolean
    message: String
  }
`