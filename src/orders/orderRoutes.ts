import express from "express";
import { checkingProductQuantity } from "../checkingProductQuantity/checkingProductQuantity";
import { verifyToken } from "../jwt/jwt";
import { handleGetAllOrders, handleUpdateByOrderId, handleAddNewOrder, handleGetOrdersByUserId, handleDeleteOrdersByOrderId, handleGetAllOrdersStatus } from "./orderController";

const orderRouter = express.Router();

orderRouter.get("/",verifyToken, handleGetAllOrders);
orderRouter.get("/get/getStatusOrder", handleGetAllOrdersStatus);
orderRouter.put("/:orderId", handleUpdateByOrderId);
orderRouter.post("/",checkingProductQuantity, handleAddNewOrder);
orderRouter.get("/:userId", handleGetOrdersByUserId);
orderRouter.delete("/:orderId", handleDeleteOrdersByOrderId);

export default orderRouter;
