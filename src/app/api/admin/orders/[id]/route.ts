import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/mongodb";
import Order from "../../../../../../models/Order";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await connectDB();

    const body = await req.json();
    const { action, reason } = body;

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    order.status = action === "approve" ? "approved" : "rejected";

    if (action === "reject" && reason) {
      order.rejectionReason = reason;
    }

    await order.save();

    return NextResponse.json({ message: "OK", order });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error updating order", error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const order = await Order.findById(params.id);
    if (!order) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    await Order.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Deleted" });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error deleting order", error: err.message },
      { status: 500 }
    );
  }
}
