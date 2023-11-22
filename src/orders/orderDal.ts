import { handleDBResponseError } from "../utils/handleErrors";
import {OrderInterface} from "../interfaces/orderInterface";
import { Types, Document, Model } from "mongoose";
import { ProductModel, ShippingDetailsModel, OrderModel } from "../mongoDB/Schemas/order";


type CollectionResult = Promise<Document[] | Error>;

export const getAllOrders = async (): CollectionResult => {
  try {
    const orders = await OrderModel.find({});
    console.log(orders);
    
    return orders;
  } catch (error) {
    return handleDBResponseError(error);
  }
};

export const updateByOrderId = async (orderId: Types.ObjectId, updatedData: OrderInterface): CollectionResult => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, updatedData, { new: true });
    if (!updatedOrder) throw new Error('Order not found!');
    return [updatedOrder];
  } catch (error) {
    return handleDBResponseError(error);
  }
};

export const addNewOrder = async (orderData: OrderInterface): CollectionResult => {
  try {
    const newOrder = new OrderModel({
      cartItems: orderData.cartItems,
      orderTime: orderData.orderTime,
      status: orderData.status,
      price: orderData.price,
      shippingDetails: orderData.shippingDetails,
    });

    newOrder.isNew = true;
    await newOrder.save();
    return [newOrder];
  } catch (error) {
    return handleDBResponseError(error);
  }
};

export const getOrdersByUserId = async (userId: string): CollectionResult => {
  try {
    const orders = await OrderModel.find({ "shippingDetails.userId": userId });
    return orders;
  } catch (error) {
    return handleDBResponseError(error);
  }
};

export const deleteByOrderId = async (orderId: string):Promise<void> => {
  try {
    console.log(orderId, "dal");
    const orderDelete = await OrderModel.findOneAndDelete({ orderId });

    if (!orderDelete) {
      console.log(`Order with ID ${orderId} not found`);
      throw new Error(`Order with ID ${orderId} not found!`);
    }

  } catch (error) {
    return handleDBResponseError(error);
  }
};
