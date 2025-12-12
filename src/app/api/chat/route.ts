// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { ChatMessage } from "../../../../models/ChatMessage";
import { connectDB } from "../../../../lib/mongodb";





export async function GET() {
  try {
    await connectDB();
    const messages = await ChatMessage.find().sort({ createdAt: -1 });
    return NextResponse.json(messages, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { author, message } = await req.json();
    await connectDB();
    const chat = await ChatMessage.create({ author, message, createdAt: new Date() });
    return NextResponse.json({ message: "Created", chat }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
  }
}
