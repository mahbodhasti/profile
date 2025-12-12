import mongoose, { Schema, model, models } from "mongoose";

export interface IConfirmation {
  userPhone: string;
  recipientPhone: string;
  status: "pending" | "approved" | "rejected";
  createdAt?: Date;
}

const ConfirmationSchema = new Schema<IConfirmation>(
  {
    userPhone: { type: String, required: true },
    recipientPhone: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export default models.Confirmation || model<IConfirmation>("Confirmation", ConfirmationSchema);
