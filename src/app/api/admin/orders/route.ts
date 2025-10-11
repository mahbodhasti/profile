// مسیر: src/app/api/orders/admin/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import Order from "../../../../../models/Order";


connectDB();

export async function GET() {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "❌ خطا در دریافت سفارش‌ها" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { orderId, status } = await req.json();
    const updated = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: "❌ خطا در به‌روزرسانی سفارش" });
  }
}
