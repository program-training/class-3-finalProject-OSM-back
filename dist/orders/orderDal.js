"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteByOrderId = exports.getOrdersByUserId = exports.addNewOrder = exports.updateByOrderId = exports.getAllOrders = void 0;
const handleErrors_1 = require("../utils/handleErrors");
const order_1 = require("../mongoDB/Schemas/order");
const getAllOrders = async () => {
    try {
        const orders = await order_1.OrderModel.find({});
        return orders;
    }
    catch (error) {
        return (0, handleErrors_1.handleDBResponseError)(error);
    }
};
exports.getAllOrders = getAllOrders;
const updateByOrderId = async (orderId, updatedData) => {
    try {
        const updatedOrder = await order_1.OrderModel.findByIdAndUpdate(orderId, updatedData, { new: true });
        if (!updatedOrder)
            throw new Error('Order not found!');
        return [updatedOrder];
    }
    catch (error) {
        return (0, handleErrors_1.handleDBResponseError)(error);
    }
};
exports.updateByOrderId = updateByOrderId;
const addNewOrder = async (orderData) => {
    try {
        const newOrder = new order_1.OrderModel({
            cartItems: orderData.cartItems,
            orderTime: orderData.orderTime,
            status: orderData.status,
            price: orderData.price,
            shippingDetails: orderData.shippingDetails,
        });
        newOrder.isNew = true;
        await newOrder.save();
        return newOrder;
    }
    catch (error) {
        return (0, handleErrors_1.handleDBResponseError)(error);
    }
};
exports.addNewOrder = addNewOrder;
const getOrdersByUserId = async (userId) => {
    try {
        const orders = await order_1.OrderModel.find({ "shippingDetails.userId": userId });
        return orders;
    }
    catch (error) {
        return (0, handleErrors_1.handleDBResponseError)(error);
    }
};
exports.getOrdersByUserId = getOrdersByUserId;
const deleteByOrderId = async (orderId) => {
    try {
        console.log(orderId, "dal");
        const orderDelete = await order_1.OrderModel.findOneAndDelete({ _id: orderId });
        console.log(orderDelete);
        if (!orderDelete) {
            console.log(`Order with ID ${orderId} not found`);
            throw new Error(`Order with ID ${orderId} not found!`);
        }
    }
    catch (error) {
        return (0, handleErrors_1.handleDBResponseError)(error);
    }
};
exports.deleteByOrderId = deleteByOrderId;
