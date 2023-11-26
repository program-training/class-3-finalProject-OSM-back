"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkingProductQuantity_1 = require("../checkingProductQuantity/checkingProductQuantity");
const jwt_1 = require("../jwt/jwt");
const orderController_1 = require("./orderController");
const orderRouter = express_1.default.Router();
orderRouter.get("/", jwt_1.verifyToken, orderController_1.handleGetAllOrders);
orderRouter.put("/:orderId", orderController_1.handleUpdateByOrderId);
orderRouter.post("/", checkingProductQuantity_1.checkingProductQuantity, orderController_1.handleAddNewOrder);
orderRouter.get("/:userId", orderController_1.handleGetOrdersByUserId);
orderRouter.delete("/:orderId", orderController_1.handleDeleteOrdersByOrderId);
exports.default = orderRouter;
