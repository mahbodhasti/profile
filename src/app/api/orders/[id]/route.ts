// مسیر پیشنهادی: src/app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import Order from "../../../../../models/Order";

// اتصال به MongoDB
connectDB();

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const body = await req.json();
    const { status } = body;

    if (!["pending", "confirmed", "rejected"].includes(status)) {
      return NextResponse.json({ success: false, message: "وضعیت نامعتبر است" }, { status: 400 });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) return NextResponse.json({ success: false, message: "سفارش پیدا نشد" }, { status: 404 });

    return NextResponse.json({ success: true, order });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "خطا در بروزرسانی سفارش" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) return NextResponse.json({ success: false, message: "سفارش پیدا نشد" }, { status: 404 });

    return NextResponse.json({ success: true, message: "سفارش حذف شد" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "خطا در حذف سفارش" }, { status: 500 });
  }
}
