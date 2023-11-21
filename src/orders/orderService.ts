import { OrderInterface } from "../interfaces/orderInterface";
import { getAllOrdersDal,updateOrderByIdDal,addOrderDal } from "./orderDal";

export const getAllOrdersService = async () :Promise <OrderInterface[]| unknown>=> {
  try {
    const result: OrderInterface[] = await getAllOrdersDal();
    return result;
  } catch (err) {
    console.error("Error reading data:(service)", err);
    throw err;
  }
};

export const updateOrderByIdService = async (orderId:string, order: OrderInterface) => {
    try {
      const result = await updateOrderByIdDal(order.id, order); 
      return result;
    } catch (err) {
      console.error("Error updating order data (service):", err);
      throw err;
    }
  };

  export const addNewOrderService = async (order: OrderInterface) => {
    try {
      const result = await addOrderDal(order); 
      return result;
    } catch (err) {
      console.error("Error adding new order (service):", err);
      throw err;
    }
  };

export const getOrdersByUserIdService = async (Orders: OrderInterface[]) => {
  try {
    const result = await getAllOrdersDal(Orders);
    return result;
  } catch (err) {
    console.error("Error reading data:(service)", err);
    throw err;
  }
};
