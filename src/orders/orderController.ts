import { Types } from 'mongoose';
import { Request, Response } from 'express';
import {OrderInterface} from '../interfaces/orderInterface';
import {
  getAllOrdersService,
  updateByOrderIdService,
  addNewOrderService,
  getOrdersByUserIdService,
} from './orderService';
import { handleError } from '../utils/handleErrors';

export const handleGetAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrdersService();
    res.send(orders);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleUpdateByOrderId = async (req: Request, res: Response) => {
  try {
    const orderId = new Types.ObjectId(req.params.orderId);
    const updatedData = req.body as OrderInterface;
    const updatedOrder = await updateByOrderIdService(orderId, updatedData);
    res.send(updatedOrder);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleAddNewOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body as OrderInterface;
    const newOrder = await addNewOrderService(orderData);
    res.send(newOrder);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleGetOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const userId = new Types.ObjectId(req.params.userId);
    const ordersByUser = await getOrdersByUserIdService(userId);
    res.send(ordersByUser);
  } catch (error) {
    handleError(res, error);
  }
};
