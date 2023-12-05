import { Types } from "mongoose";
import {
  getAllOrdersService,
  getOrdersByUserIdService,
  updateByOrderIdService,
  addNewOrderService,
  deleteOrdersByOrderIdService,
} from "../orders/orderService"; // Update the path accordingly
import { OrderInterface } from "../interfaces/orderInterface";

const resolvers = {
  Query: {
    getAllOrders: () => getAllOrdersService(),
    getOrdersByUserId: (_: unknown, { userId }: { userId: string }) =>
      getOrdersByUserIdService(userId),
  },
  Mutation: {
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
};

export default resolvers;

// import { getAllOrdersService,deleteOrdersByOrderIdService } from "../orders/orderService";
// import { getUser } from "../jwt/jwt";

// export const resolvers = {
//     Query:{
//       orders: async (_ :any, __:any, contextValue: any)=>{
//             try {
//                console.log(contextValue)
//                 getUser(contextValue.token)
//                 const orders = await getAllOrdersService();
//                 return orders;
//               } catch (error) {
//                 throw new Error('Could not get all orders');
//               }
//         }
//     },
//    Mutation: {
//     deleteOrder: async ( _: any, { deleteOrderInput }: { deleteOrderInput: { id: string } }) => {
//       const { id } = deleteOrderInput;
//       try {
//         const order = await deleteOrdersByOrderIdService(id);
//         return order;
//       } catch (error) {
//         console.error('Error deleting order:', error);
//         throw new Error('Could not delete order');
//       }
//     }
//    }
//   }
