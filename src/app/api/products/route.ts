// ✅ src/app/api/products/route.ts
import mongoose, { Schema, models } from "mongoose";
import { NextResponse } from "next/server";

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI!);
      console.log("✅ MongoDB connected: products");
    } catch (err: any) {
      console.error("❌ MongoDB error:", err.message);
      throw new Error("Database connection failed");
    }
  }
};

const ProductSchema = new Schema({
  title: String,
  price: Number,
  image: String,
  description: String,
  rating: Number,
});

const Product = models.Product || mongoose.model("Product", ProductSchema);

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().lean();
    return NextResponse.json(products, { status: 200 });
  } catch (err: any) {
    console.error("❌ GET /products error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
