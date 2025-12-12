import mongoose, { models, Schema } from "mongoose";
import { NextResponse } from "next/server";

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/thunder_db");
    console.log("✅ MongoDB connected for Admin Approval");
  }
}

const OrderSchema = new Schema({
  userEmail: String,
  userId: String,
  items: Array,
  total: Number,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});
const Order = models.Order || mongoose.model("Order", OrderSchema);

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { orderId, action } = await req.json(); // action = "approved" | "rejected"
    if (!orderId || !action) return NextResponse.json({ error: "Missing data" }, { status: 400 });

    const order = await Order.findById(orderId);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    order.status = action;
    await order.save();

    return NextResponse.json(order);
  } catch (err: any) {
    console.error("❌ Admin approval error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
