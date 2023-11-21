import chalk from "chalk";
import { Types } from "mongoose";
import {OrderInterface} from "../interfaces/orderInterface";
import { getAllOrders, updateByOrderId, addNewOrder, getOrdersByUserId } from "./orderDal";

export const getAllOrdersService = async () => {
  try {
    const ordersFromDAL = await getAllOrders();
    if (!ordersFromDAL) {
      throw new Error("No orders in the database");
    }
    return ordersFromDAL;
  } catch (error) {
    console.log(chalk.redBright(error));
    throw error;
  }
};

export const updateByOrderIdService = async (orderId: Types.ObjectId, updatedData: OrderInterface) => {
  try {
    console.log(orderId);
    const updatedOrderFromDAL = await updateByOrderId(orderId, updatedData);
    return updatedOrderFromDAL;
  } catch (error) {
    console.log(chalk.redBright(error));
    throw error;
  }
};

export const addNewOrderService = async (orderData: OrderInterface) => {
  try {
    const newOrderFromDAL = await addNewOrder(orderData);
    return newOrderFromDAL;
  } catch (error) {
    console.log(chalk.redBright(error));
    throw error;
  }
};

export const getOrdersByUserIdService = async (userId: string) => {
  try {
    console.log(userId, "service");
    const ordersByUserFromDAL = await getOrdersByUserId(userId);

    // Use type assertion to explicitly tell TypeScript that you expect an array
    if (!Array.isArray(ordersByUserFromDAL) || ordersByUserFromDAL.length === 0) {
      throw new Error("No orders found for the given user");
    }

    return ordersByUserFromDAL;
  } catch (error) {
    console.log(chalk.redBright(error));
    throw error;
  }
};

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
