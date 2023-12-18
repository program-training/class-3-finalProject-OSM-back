import chalk from "chalk";
import { Types } from "mongoose";
import { OrderInterface } from "../interfaces/orderInterface";
import { getAllOrders, updateByOrderId, addNewOrder, getOrdersByUserId, deleteByOrderId, getOrdersForHours } from "./orderDal";
import RedisClient from "../redis/redis";

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
    const updatedOrderFromDAL = await updateByOrderId(orderId, updatedData);
    const key = `orders:${updatedOrderFromDAL.id}`;
    const dataFromRedis = await RedisClient.get(key);
    if (dataFromRedis) {
      console.log("Data retrieved from Redis");
      return JSON.parse(dataFromRedis);
    }
    await RedisClient.setEx(key,200, JSON.stringify(updatedOrderFromDAL));
    return updatedOrderFromDAL;
  } catch (error) {
    console.log(chalk.redBright(error));
    throw error;
  }
};

export const addNewOrderService = async (orderData: OrderInterface) => {
  try {
    const newOrderFromDAL = await addNewOrder(orderData);
    const key = `orders:${newOrderFromDAL.id}`;
    const dataFromRedis = await RedisClient.get(key);
    if (dataFromRedis) {
      console.log("Data retrieved from Redis");
      return JSON.parse(dataFromRedis);
    }
    await RedisClient.setEx(key,200, JSON.stringify(newOrderFromDAL));
    return newOrderFromDAL;
  } catch (error) {
    console.log(chalk.redBright(error));
    throw error;
  }
};

export const getOrdersByUserIdService = async (userId: string) => {
  try {
    const ordersByUserFromDAL = await getOrdersByUserId(userId);
    const key = `orders:${userId}`;
    const dataFromRedis = await RedisClient.get(key);
    if (dataFromRedis) {
      console.log("Data retrieved from Redis");
      return JSON.parse(dataFromRedis);
    }
    await RedisClient.setEx(key,200, JSON.stringify(ordersByUserFromDAL));
    if (!Array.isArray(ordersByUserFromDAL) || ordersByUserFromDAL.length === 0) {
      throw new Error("No orders found for the given user");
    }
    return ordersByUserFromDAL;
  } catch (error) {
    console.log(chalk.redBright(error));
    throw error;
  }
};


export const deleteOrdersByOrderIdService = async (orderId:string) => {
  try {
    const deleteOrderFromDAL = await deleteByOrderId(orderId);
     return deleteOrderFromDAL;
  } catch (error) {
    console.log(chalk.redBright(error));
    throw error;
  }
};
export const getAllOrdersServiceStatus = async () => {
  try {
    const ordersFromDAL = await getAllOrders();

    if (ordersFromDAL instanceof Error) {
      throw ordersFromDAL;
    }

    const orderStatistics = {
      Pending: 0,
      Refunded: 0,
      Delivered: 0,
    };

    ordersFromDAL.forEach((orderDocument) => {
      const order = orderDocument.toObject();

      switch (order.status) {
        case "Pending":
          orderStatistics.Pending += 1;
          break;
        case "Refunded":
          orderStatistics.Refunded += 1;
          break;
        case "Delivered":
          orderStatistics.Delivered += 1;
          break;
        default:
          break;
      }
    });

    return orderStatistics;
  } catch (error) {
    console.log(chalk.redBright(error));
    throw error;
  }
};

export const getOrdersForHoursService = async () => {
  try{
    const orderForHours = await getOrdersForHours();
    return orderForHours;
  }catch (error) {
    console.log(chalk.redBright(error));
    throw error
  }
}
