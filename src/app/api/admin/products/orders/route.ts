import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/mongodb";
import Order from "../../../../../../models/Order";


export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const order = await Order.create(data);
  return NextResponse.json(order);
}

export async function GET() {
  await connectDB();
  const orders = await Order.find().populate("productId");
  return NextResponse.json(orders);
}
