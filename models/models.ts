// models/Order.ts
import mongoose, { Schema, model } from "mongoose";

interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  userId: string;
  email: string;
  phone: string;
  items: OrderItem[];
  totalPrice: number;
  transactionId: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

const orderItemSchema = new Schema<OrderItem>({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema<Order>({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  items: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  transactionId: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || model<Order>("Order", orderSchema);
