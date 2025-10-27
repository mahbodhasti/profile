import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Order from "../../../../models/Order";


export async function GET(request: Request) {
  await connectDB();
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  const orders = await Order.find({ userId });
  return NextResponse.json(orders);
}
