import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import Order from "../../../../../models/Order";


export async function POST(req: Request) {
  try {
    await connectDB();
    const { userId, email, phone, transactionId } = await req.json();

    if (!userId || !email || !phone || !transactionId) {
      return NextResponse.json(
        { error: "تمام فیلدها الزامی هستند." },
        { status: 400 }
      );
    }

    const newOrder = await Order.create({
      userId,
      email,
      phone,
      transactionId,
      status: "pending",
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    return NextResponse.json({ error: "خطا در ثبت سفارش" }, { status: 500 });
  }
}
