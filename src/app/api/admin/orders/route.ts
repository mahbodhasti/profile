import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import Order from "../../../../../models/Order";


export async function POST(req: Request) {
  try {
    const { email, phone, transactionId, items, totalPrice } = await req.json();

    if (!email || !phone || !transactionId) {
      return NextResponse.json(
        { message: "ایمیل، شماره تلفن و شماره تراکنش الزامی هستند" },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "هیچ آیتمی انتخاب نشده" }, { status: 400 });
    }

    await connectDB();

    const newOrder = await Order.create({
      email,
      phone,
      transactionId,
      items,
      totalPrice,
      status: "pending",
      createdAt: new Date(),
    });

    return NextResponse.json({ ...newOrder.toObject(), userId: newOrder._id.toString() }, { status: 201 });
  } catch (err: any) {
    console.error("❌ POST /api/orders error:", err);
    return NextResponse.json(
      { message: "Error creating order", error: err.message ?? String(err) },
      { status: 500 }
    );
  }
}
