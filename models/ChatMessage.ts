// models/ChatMessage.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IChatMessage extends Document {
  author: string;
  message: string;
  createdAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>({
  author: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ChatMessage =
  mongoose.models.ChatMessage || mongoose.model<IChatMessage>("ChatMessage", ChatMessageSchema);
