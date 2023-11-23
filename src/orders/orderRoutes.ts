import express from "express";
import { checkingProductQuantity } from "../checkingProductQuantity/checkingProductQuantity";
import { verifyToken } from "../jwt/jwt";
import { handleGetAllOrders, handleUpdateByOrderId, handleAddNewOrder, handleGetOrdersByUserId, handleDeleteOrdersByOrderId } from "./orderController";

const orderRouter = express.Router();

orderRouter.get("/",verifyToken, handleGetAllOrders);
orderRouter.put("/:orderId",verifyToken, handleUpdateByOrderId);
orderRouter.post("/",checkingProductQuantity, handleAddNewOrder);
orderRouter.get("/:userId",verifyToken, handleGetOrdersByUserId);
orderRouter.delete("/:orderId",verifyToken, handleDeleteOrdersByOrderId);

export default orderRouter;
