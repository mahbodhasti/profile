import mongoose, { Schema, models } from "mongoose";

const CartItemSchema = new Schema({
  userId: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  quantity: { type: Number, default: 1 },
});

const CartItem = models.CartItem || mongoose.model("CartItem", CartItemSchema);
export default CartItem;
