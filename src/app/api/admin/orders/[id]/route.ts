import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../lib/auth";
import Order from "../../../../../../models/Order";


// PUT -> انتظار body: { action: "approve" | "reject", reason?: string }
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();
    const action = body.action as string;

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (action === "approve") {
      order.status = "approved";
      // optional: order.approvedAt = new Date();
    } else if (action === "reject") {
      order.status = "rejected";
      // optional: order.rejectionReason = body.reason ?? "";
    }

    await order.save();
    return NextResponse.json({ message: "OK", order }, { status: 200 });
  } catch (err: any) {
    console.error("❌ PUT /api/admin/orders/[id] error:", err);
    return NextResponse.json({ message: "Error updating order", error: err.message }, { status: 500 });
  }
}

// DELETE -> حذف سفارش
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = params;
    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    await Order.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (err: any) {
    console.error("❌ DELETE /api/admin/orders/[id] error:", err);
    return NextResponse.json({ message: "Error deleting order", error: err.message }, { status: 500 });
  }
}
