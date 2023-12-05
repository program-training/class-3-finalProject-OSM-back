import { userResolvers } from '../users/userResolvers';
export const resolvers={
    Query: {
      getAllUsers: userResolvers.getAllUsers,
    },
    Mutation: {
      registerUser: userResolvers.registerUser,
      loginUser: userResolvers.login,
      deleteUser: userResolvers.deleteUser,
      forgotPassword: userResolvers.forgotPassword,
      comperepassword: userResolvers.comperepassword,
      resetPassword: userResolvers.resetPassword,
    },
  }