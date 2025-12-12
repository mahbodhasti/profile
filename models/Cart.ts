import mongoose, { Schema } from "mongoose";

const CartSchema = new Schema({
  userId: { type: String, required: true },
  product: {
    productId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    quantity: { type: Number, default: 1 },
  },
});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
