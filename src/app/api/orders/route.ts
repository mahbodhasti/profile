import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Order from "../../../../models/Order";


export async function GET() {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, email, phone } = body;

    if (!email || !phone || !userId) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const newOrder = await Order.create({
      userId,
      email,
      phone,
      status: "pending",
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (err) {
    console.error("❌ POST /api/orders error:", err);
    return NextResponse.json(
      { message: "Error creating order", error: String(err) },
      { status: 500 }
    );
  }
}
