import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  alt: { type: String, default: "" },
  price: { type: String, required: true },
  rating: { type: Number, default: 0 },
  description: { type: String, default: "" },
  option: { type: String, default: "" },
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
