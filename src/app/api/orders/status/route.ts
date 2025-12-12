import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import Order from "../../../../../models/Order";


export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "userId لازم است" }, { status: 400 });

    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).limit(1);
    if (orders.length === 0) return NextResponse.json({ status: "pending" });

    return NextResponse.json({ status: orders[0].status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در دریافت وضعیت" }, { status: 500 });
  }
}
