// src/models/Order.ts
import mongoose, { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
  items: [{ productId: String, title: String, price: String, quantity: Number }],
  totalPrice: Number,
  paymentId: String,
  status: { type: String, enum: ["pending", "confirmed", "rejected"], default: "pending" },
  userEmail: String,
  createdAt: { type: Date, default: Date.now },
});

const Order = models.Order || model("Order", orderSchema);
export default Order;
