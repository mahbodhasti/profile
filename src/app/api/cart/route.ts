import { connectDB } from "../../../../lib/mongodb";
import Cart from "../../../../models/Cart";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return new Response(JSON.stringify([]), { status: 200 });

    await connectDB();
    const cart = await Cart.find({ userId });
    return new Response(JSON.stringify(cart), { status: 200 });
  } catch (err) {
    console.error("❌ GET /api/cart error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch cart" }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, product } = await req.json();
    if (!userId || !product) return new Response(JSON.stringify({ error: "Invalid data" }), { status: 400 });

    await connectDB();

    // تبدیل price به عدد ایمن
    product.price = Number(String(product.price).replace(/[^\d.]/g, ""));
    if (isNaN(product.price)) product.price = 0;

    const existingItem = await Cart.findOne({ userId, "product.productId": product.productId });

    if (existingItem) {
      existingItem.product.quantity += product.quantity || 1;
      await existingItem.save();
    } else {
      await Cart.create({ userId, product });
    }

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    console.error("❌ POST /api/cart error:", err);
    return new Response(JSON.stringify({ error: "Failed to add to cart" }), { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId, productId } = await req.json();
    if (!userId || !productId) return new Response(JSON.stringify({ error: "Invalid data" }), { status: 400 });

    await connectDB();
    await Cart.deleteOne({ userId, "product.productId": productId });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("❌ DELETE /api/cart error:", err);
    return new Response(JSON.stringify({ error: "Failed to delete cart item" }), { status: 500 });
  }
}
