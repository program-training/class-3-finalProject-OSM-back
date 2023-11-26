"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.ShippingDetailsModel = exports.ProductModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const productSchema = new mongoose_1.Schema({
    id: String,
    name: String,
    description: String,
    price: Number,
    quantity: Number
});
const shippingDetailsSchema = new mongoose_1.Schema({
    address: String,
    userId: Number,
    contactNumber: String,
    orderType: String,
    id: String
});
const orderSchema = new mongoose_1.Schema({
    id: String,
    cartItems: [productSchema],
    orderTime: String,
    status: String,
    price: Number,
    shippingDetails: shippingDetailsSchema
});
exports.ProductModel = mongoose_1.default.model('Product', productSchema);
exports.ShippingDetailsModel = mongoose_1.default.model('ShippingDetails', shippingDetailsSchema);
exports.OrderModel = mongoose_1.default.model('Order', orderSchema);
