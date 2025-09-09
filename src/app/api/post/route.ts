import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import { Post } from "../../../../models/Posts";




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
  }
}
