// مسیر پیشنهادی: src/app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import { Post } from "../../../../../models/Posts";


connectDB();

// PATCH -> ویرایش پست
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const post = await Post.findByIdAndUpdate(params.id, data, { new: true });
    if (!post) return NextResponse.json({ success: false, message: "پست پیدا نشد" }, { status: 404 });
    return NextResponse.json({ success: true, post });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "خطا در ویرایش پست" }, { status: 500 });
  }
}

// DELETE -> حذف پست
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const post = await Post.findByIdAndDelete(params.id);
    if (!post) return NextResponse.json({ success: false, message: "پست پیدا نشد" }, { status: 404 });
    return NextResponse.json({ success: true, message: "پست حذف شد" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "خطا در حذف پست" }, { status: 500 });
  }
}
