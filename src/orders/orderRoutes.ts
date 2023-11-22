import express from "express";
import { handleGetAllOrders, handleUpdateByOrderId, handleAddNewOrder, handleGetOrdersByUserId , handleDeleteByOrderId } from "./orderController";

const orderRouter = express.Router();

orderRouter.get("/", handleGetAllOrders);
orderRouter.put("/:orderId", handleUpdateByOrderId);
orderRouter.post("/", handleAddNewOrder);
orderRouter.get("/:userId", handleGetOrdersByUserId);
orderRouter.delete("/:orderId", handleDeleteByOrderId);
export default orderRouter;
