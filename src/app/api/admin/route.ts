
import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Order from "../../../../models/Order";

export async function GET() {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json(orders);
}

export async function PATCH(req: Request) {
  await connectDB();
  const { orderId, status } = await req.json();
  if (!orderId || !status) return NextResponse.json({ success: false, message: "فیلدها ناقص است" });

  const order = await Order.findById(orderId);
  if (!order) return NextResponse.json({ success: false, message: "سفارش پیدا نشد" });

  order.status = status;
  await order.save();

  return NextResponse.json({ success: true });
}
