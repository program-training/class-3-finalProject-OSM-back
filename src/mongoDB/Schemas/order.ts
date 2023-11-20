import mongoose, { Schema, Document, Model } from 'mongoose';

const productSchema = new Schema({
  id: String,
  name: String, 
  description: String,
  price: Number,
  quantity: Number  
});

const shippingDetailsSchema = new Schema({
  address: String,
  userId: Number,
  contactNumber: String, 
  orderType: String,
  id: String
});

const orderSchema = new Schema({
  id: String,
  cartItems: [productSchema],
  orderTime: String,
  status: String,
  price: Number,
  shippingDetails: shippingDetailsSchema 
});

export const Product = mongoose.model('Product', productSchema);
export const ShippingDetails = mongoose.model('ShippingDetails', shippingDetailsSchema);
export const Order = mongoose.model('Order', orderSchema);