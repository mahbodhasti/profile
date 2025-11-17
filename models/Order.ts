import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    transactionId: { type: String, required: true },
    items: { type: Array, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Order = models.Order || model("Order", OrderSchema);
export default Order;
