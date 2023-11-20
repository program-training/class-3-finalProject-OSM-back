import express from "express";

const orderRouter = express.Router();

orderRouter.get("/");
orderRouter.put("/:orderId");
orderRouter.post("/");
orderRouter.get("/:userId");

export default orderRouter;
