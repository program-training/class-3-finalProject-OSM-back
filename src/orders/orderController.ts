import { Request, Response } from "express";
// import Jwt from "jsonwebtoken";
import { OrderInterface } from "./orderInterface";
import { registerService } from "./orderService";

export const getAllController = async (req: Request, res: Response) => {
  try {
    const order: OrderInterface = req.body;
    const orders = await registerService(order);

    if (orders) return res.status(200).json({ users: orders });
    else {
      return res.status(404).json({ message: "No orders found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while retrieving orders" });
  }
};
