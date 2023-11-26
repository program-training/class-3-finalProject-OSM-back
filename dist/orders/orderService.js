"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrdersByOrderIdService = exports.getOrdersByUserIdService = exports.addNewOrderService = exports.updateByOrderIdService = exports.getAllOrdersService = void 0;
const chalk_1 = __importDefault(require("chalk"));
const orderDal_1 = require("./orderDal");
const getAllOrdersService = async () => {
    try {
        const ordersFromDAL = await (0, orderDal_1.getAllOrders)();
        if (!ordersFromDAL) {
            throw new Error("No orders in the database");
        }
        return ordersFromDAL;
    }
    catch (error) {
        console.log(chalk_1.default.redBright(error));
        throw error;
    }
};
exports.getAllOrdersService = getAllOrdersService;
const updateByOrderIdService = async (orderId, updatedData) => {
    try {
        console.log(orderId);
        const updatedOrderFromDAL = await (0, orderDal_1.updateByOrderId)(orderId, updatedData);
        return updatedOrderFromDAL;
    }
    catch (error) {
        console.log(chalk_1.default.redBright(error));
        throw error;
    }
};
exports.updateByOrderIdService = updateByOrderIdService;
const addNewOrderService = async (orderData) => {
    try {
        const newOrderFromDAL = await (0, orderDal_1.addNewOrder)(orderData);
        return newOrderFromDAL;
    }
    catch (error) {
        console.log(chalk_1.default.redBright(error));
        throw error;
    }
};
exports.addNewOrderService = addNewOrderService;
const getOrdersByUserIdService = async (userId) => {
    try {
        console.log(userId, "service");
        const ordersByUserFromDAL = await (0, orderDal_1.getOrdersByUserId)(userId);
        if (!Array.isArray(ordersByUserFromDAL) || ordersByUserFromDAL.length === 0) {
            throw new Error("No orders found for the given user");
        }
        return ordersByUserFromDAL;
    }
    catch (error) {
        console.log(chalk_1.default.redBright(error));
        throw error;
    }
};
exports.getOrdersByUserIdService = getOrdersByUserIdService;
const deleteOrdersByOrderIdService = async (orderId) => {
    try {
        console.log(orderId);
        const deleteOrderFromDAL = await (0, orderDal_1.deleteByOrderId)(orderId);
        return deleteOrderFromDAL;
    }
    catch (error) {
        console.log(chalk_1.default.redBright(error));
        throw error;
    }
};
exports.deleteOrdersByOrderIdService = deleteOrdersByOrderIdService;
