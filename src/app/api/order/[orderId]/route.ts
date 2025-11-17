// src/app/api/orders/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import OrderModel from "../../../../../models/Order";


export async function POST(req: Request) {
  try {
    await connectDB();

    const { items, userId, email, phone, transactionId } = await req.json();

    if (!items || !userId || !email || !transactionId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const totalPrice = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

    const newOrder = await OrderModel.create({
      userId,
      email,
      phone,
      items,
      totalPrice,
      transactionId,
      status: "pending",
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (err) {
    console.error("❌ POST /api/orders error:", err);
    return NextResponse.json({ message: "Error creating order", error: String(err) }, { status: 500 });
  }
}
