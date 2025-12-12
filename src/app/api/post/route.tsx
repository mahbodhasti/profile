import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Post from "../../../../models/Posts";
import sttyle from "./post.module.css";

// GET همه پست‌ها
export async function GET() {
  await connectDB();
  const posts = await Post.find({});
  return NextResponse.json(posts);
}

// POST ایجاد پست جدید (ادمین)
export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const post = new Post(data);
  await post.save();
  return NextResponse.json({ success: true, post });
}

// PATCH ویرایش پست (ادمین)
export async function PATCH(req: NextRequest) {
  await connectDB();
  const { id, updated } = await req.json();
  const post = await Post.findByIdAndUpdate(id, updated, { new: true });
  return NextResponse.json({ success: true, post });
}

// DELETE حذف پست (ادمین)
export async function DELETE(req: NextRequest) {
  await connectDB();
  const { id } = await req.json();
  await Post.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
