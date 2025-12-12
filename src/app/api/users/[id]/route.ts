import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import Order from "../../../../../models/Order";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const orders = await Order.find({ userId: params.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching user orders", error: error.message },
      { status: 500 }
    );
  }
}
