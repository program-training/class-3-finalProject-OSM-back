import { Types } from "mongoose";
import { OrderInterface } from "../interfaces/orderInterface";
import {
    getAllOrdersService,
    getOrdersByUserIdService,
    updateByOrderIdService,
    addNewOrderService,
    deleteOrdersByOrderIdService,
    getAllOrdersServiceStatus,
    getOrdersForHoursService
  } from "../orders/orderService"; 
export const orderResolvers = {
    getAllOrders: () => getAllOrdersService(),

    getOrdersByUserId: (_: unknown, { userId }: { userId: string }) =>
      getOrdersByUserIdService(userId),

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
      handleGetAllOrdersStatus:async()=>{
        try {
          const orders = await getAllOrdersServiceStatus();
          return orders;
        } catch (error) {
          console.error("Error deleting order:", error);
          throw new Error("Could not delete order");
        }
      },
      getOrdersForHours: async () => {
        try{
          const orders = await getOrdersForHoursService();
          return orders;
        }catch (error){
          throw new Error("Could not delete order")
        }
      }
}