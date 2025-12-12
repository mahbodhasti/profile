// src/app/api/test/route.js
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

export async function GET(req) {
  try {
    await mongoose.connect(uri);
    await mongoose.disconnect();
    return new Response("✅ اتصال به MongoDB برقرار شد!", { status: 200 });
  } catch (err) {
    return new Response(`❌ اتصال برقرار نشد: ${err.message}`, { status: 500 });
  }
}
