import { connectDB } from "../../../../lib/mongodb";
import Order from "../../../../models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const order = new Order(body);
    await order.save();

    return new Response(JSON.stringify({ success: true, order }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: (err as Error).message }), { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const userEmail = url.searchParams.get("userEmail");

    const orders = await Order.find(userEmail ? { userEmail } : {}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}
