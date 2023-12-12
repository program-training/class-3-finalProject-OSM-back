import { userResolvers } from '../users/userResolvers';
import { orderResolvers } from '../orders/orderResolvers';
export const resolvers={
    Query: {
      getAllUsers: userResolvers.getAllUsers,
      getTimeRegister:userResolvers.getTimeRegister,
      getAllOrders:orderResolvers.getAllOrders,
      getOrdersByUserId:orderResolvers.getOrdersByUserId
    },
    Mutation: {
      registerUser: userResolvers.registerUser,
      loginUser: userResolvers.login,
      deleteUser: userResolvers.deleteUser,
      forgotPassword: userResolvers.forgotPassword,
      comperepassword: userResolvers.comperepassword,
      resetPassword: userResolvers.resetPassword,
      updateOrder:orderResolvers.updateOrder,
      addNewOrder:orderResolvers.addNewOrder,
      deleteOrder:orderResolvers.deleteOrder,
      handleGetAllOrdersStatus:orderResolvers.handleGetAllOrdersStatus

    },
  }