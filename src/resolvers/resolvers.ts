import { Types } from "mongoose";
import { userResolvers } from '../users/userResolvers';
import {
  getAllOrdersService,
  getOrdersByUserIdService,
  updateByOrderIdService,
  addNewOrderService,
  deleteOrdersByOrderIdService,
} from "../orders/orderService"; // Update the path accordingly
import { OrderInterface } from "../interfaces/orderInterface";

export const resolvers={
    Query: {
      getAllUsers: userResolvers.getAllUsers,
<<<<<<< HEAD
      getTimeRegister:userResolvers.getTimeRegister
=======
      getAllOrders: () => getAllOrdersService(),
     getOrdersByUserId: (_: unknown, { userId }: { userId: string }) =>
      getOrdersByUserIdService(userId),
>>>>>>> graphQL_develop
    },
    Mutation: {
      registerUser: userResolvers.registerUser,
      loginUser: userResolvers.login,
      deleteUser: userResolvers.deleteUser,
      forgotPassword: userResolvers.forgotPassword,
      comperepassword: userResolvers.comperepassword,
      resetPassword: userResolvers.resetPassword,
      updateOrder: (
        _: unknown,
        { orderId, updatedData }: { orderId: string; updatedData: OrderInterface }
      ) => updateByOrderIdService(new Types.ObjectId(orderId), updatedData),
      addNewOrder: (_: unknown, { orderData }: { orderData: OrderInterface }) =>{
       try{
        const newOrder = addNewOrderService(orderData)
        return newOrder
       } catch(error){
        throw new Error("Could not adding order");
       }
      },
      deleteOrder: async (_: unknown, { orderId }: { orderId: string }) => {
        const id = orderId;
        try {
          const order = await deleteOrdersByOrderIdService(id);
          return order;
        } catch (error) {
          console.error("Error deleting order:", error);
          throw new Error("Could not delete order");
        }
      },
    },
  }