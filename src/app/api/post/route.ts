<<<<<<< HEAD
import { NextResponse } from "next/server";
=======
// مسیر پیشنهادی: src/app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
>>>>>>> fcb3719 (Add current project files)
import { connectDB } from "../../../../lib/mongodb";
import { Post } from "../../../../models/Posts";


<<<<<<< HEAD


export async function POST(req: Request) {
  try {
    const { title, content, author } = await req.json();
    await connectDB();

    const newPost = await Post.create({ title, content, author });
    return NextResponse.json({ message: "Post created", post: newPost }, { status: 201 });
    
  } catch (err) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().sort({ createdAt: -1 }).exec(); // آخرین‌ها اول
    return NextResponse.json(posts, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
=======
connectDB();

// GET -> لیست همه پست‌ها
export async function GET() {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "خطا در دریافت پست‌ها" }, { status: 500 });
  }
}

// POST -> ایجاد پست جدید
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const post = await Post.create(data);
    return NextResponse.json({ success: true, post });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "خطا در ایجاد پست" }, { status: 500 });
>>>>>>> fcb3719 (Add current project files)
  }
}
