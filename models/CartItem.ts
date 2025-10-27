import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "/fallback-product.png" },
  description: { type: String, default: "" },
  rating: { type: Number, default: 5 }
});

export const Product = models.Product || mongoose.model("Product", ProductSchema);

const CartItemSchema = new Schema({
  userId: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  title: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  image: String,
  email: String,
  phone: String,
  status: { type: String, enum: ["pending", "approved"], default: "pending" }
});

export const CartItem = models.CartItem || mongoose.model("CartItem", CartItemSchema);

// اتصال MongoDB امن
export async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI!);
      console.log("✅ MongoDB connected");
    } catch (err: any) {
      console.error("❌ MongoDB connection failed:", err.message);
      throw new Error(err.message);
    }
  }
}
