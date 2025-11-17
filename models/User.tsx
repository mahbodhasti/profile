// src/models/User.ts
import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    isAdmin: { type: Boolean, default: false }, // <-- اینجا
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
