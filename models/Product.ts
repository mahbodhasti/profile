import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema({
  title: String,
  price: Number,
  image: String,
});

export const Product = models.Product || mongoose.model("Product", productSchema);
