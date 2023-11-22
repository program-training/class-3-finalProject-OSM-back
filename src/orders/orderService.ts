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

