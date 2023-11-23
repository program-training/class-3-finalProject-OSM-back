import express from "express";
import { checkingProductQuantity } from "../checkingProductQuantity/checkingProductQuantity";
import { handleGetAllOrders, handleUpdateByOrderId, handleAddNewOrder, handleGetOrdersByUserId } from "./orderController";
import { verifyToken } from "../jwt/jwt";

const orderRouter = express.Router();

orderRouter.get("/",verifyToken, handleGetAllOrders);
orderRouter.put("/:orderId", handleUpdateByOrderId);
orderRouter.post("/",checkingProductQuantity, handleAddNewOrder);
orderRouter.get("/:userId", handleGetOrdersByUserId);

export default orderRouter;
