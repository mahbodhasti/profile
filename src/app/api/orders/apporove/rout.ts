// src/app/api/orders/approve/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import Order from "../../../../../models/Order";


export async function POST(req: Request) {
  try {
    await connectDB();
    const { orderId, status } = await req.json();

    if (!orderId || !["approved", "rejected"].includes(status)) {
      return NextResponse.json({ success: false, message: "پارامترهای نامعتبر" }, { status: 400 });
    }

    const updated = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!updated) return NextResponse.json({ success: false, message: "سفارش پیدا نشد" }, { status: 404 });

    return NextResponse.json({ success: true, order: updated });
  } catch (err) {
    console.error("Error POST /api/orders/approve:", err);
    return NextResponse.json({ success: false, message: "خطا در به‌روزرسانی سفارش" }, { status: 500 });
  }
}
