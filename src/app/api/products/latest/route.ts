import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import Product from "../../../../../models/Product";


export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 }).limit(12);
    return NextResponse.json(products);
  } catch (err) {
    console.error("Error /api/products/latest:", err);
    return NextResponse.json([], { status: 500 });
  }
}
