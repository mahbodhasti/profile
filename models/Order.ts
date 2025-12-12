import mongoose, { Schema, Document, models } from "mongoose";

export interface IOrder extends Document {
  email: string;
  phone: string;
  transactionId: string;
  items: {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  totalPrice: number;
  status: "pending" | "approved" | "rejected";
  userId?: string; // اگر خواستی به یوزر وصل بشه
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    transactionId: { type: String, required: true },
    items: [
      {
        id: String,
        title: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "pending" },
    userId: { type: String },
  },
  { timestamps: true }
);

export default models.Order || mongoose.model("Order", OrderSchema);
