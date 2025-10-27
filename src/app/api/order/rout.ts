import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Order from "../../../../models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, email, phone } = body;

    const newOrder = await Order.create({
      userId,
      email,
      phone,
      status: "pending",
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (err) {
    console.error("POST /api/orders error:", err);
    return NextResponse.json({ message: "Error creating order" }, { status: 500 });
  }
}
