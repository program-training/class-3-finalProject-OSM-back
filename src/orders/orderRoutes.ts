import express from "express";
import { handleGetAllOrders, handleUpdateByOrderId, handleAddNewOrder, handleGetOrdersByUserId } from "./orderController";
import { verifyToken } from "../jwt/jwt";

const orderRouter = express.Router();

orderRouter.get("/",verifyToken, handleGetAllOrders);
orderRouter.put("/:orderId", handleUpdateByOrderId);
orderRouter.post("/", handleAddNewOrder);
orderRouter.get("/:userId", handleGetOrdersByUserId);

export default orderRouter;
