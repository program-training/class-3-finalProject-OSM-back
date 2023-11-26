"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteOrdersByOrderId = exports.handleGetOrdersByUserId = exports.handleAddNewOrder = exports.handleUpdateByOrderId = exports.handleGetAllOrders = void 0;
const mongoose_1 = require("mongoose");
const orderService_1 = require("./orderService");
const handleErrors_1 = require("../utils/handleErrors");
const handleGetAllOrders = async (req, res) => {
    try {
        const orders = await (0, orderService_1.getAllOrdersService)();
        res.send(orders);
    }
    catch (error) {
        (0, handleErrors_1.handleError)(res, error);
    }
};
exports.handleGetAllOrders = handleGetAllOrders;
const handleUpdateByOrderId = async (req, res) => {
    try {
        const orderId = new mongoose_1.Types.ObjectId(req.params.orderId);
        const updatedData = req.body;
        const updatedOrder = await (0, orderService_1.updateByOrderIdService)(orderId, updatedData);
        res.send(updatedOrder);
    }
    catch (error) {
        (0, handleErrors_1.handleError)(res, error);
    }
};
exports.handleUpdateByOrderId = handleUpdateByOrderId;
const handleAddNewOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const newOrder = await (0, orderService_1.addNewOrderService)(orderData);
        res.json({ newOrder: newOrder, productNotFound: res.locals.productNotFound });
    }
    catch (error) {
        (0, handleErrors_1.handleError)(res, error);
    }
};
exports.handleAddNewOrder = handleAddNewOrder;
const handleGetOrdersByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const ordersByUser = await (0, orderService_1.getOrdersByUserIdService)(userId);
        res.send(ordersByUser);
    }
    catch (error) {
        (0, handleErrors_1.handleError)(res, error);
    }
};
exports.handleGetOrdersByUserId = handleGetOrdersByUserId;
const handleDeleteOrdersByOrderId = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        console.log(orderId, "controller");
        const ordersByUser = await (0, orderService_1.deleteOrdersByOrderIdService)(orderId);
        res.send({ message: 'Order deleted successfully' });
    }
    catch (error) {
        (0, handleErrors_1.handleError)(res, error);
    }
};
exports.handleDeleteOrdersByOrderId = handleDeleteOrdersByOrderId;
