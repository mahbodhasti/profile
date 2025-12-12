import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/mongodb";
import User from "../../../../models/User";

// GET همه کاربران (ادمین)
export async function GET() {
  await connectDB();
  const users = await User.find({});
  return NextResponse.json(users);
}

// POST ثبت‌نام کاربر
export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed });
  await user.save();
  return NextResponse.json({ success: true, user });
}

// PATCH تغییر نقش یا رمز (ادمین)
export async function PATCH(req: NextRequest) {
  await connectDB();
  const { id, role } = await req.json();
  const user = await User.findByIdAndUpdate(id, { role }, { new: true });
  return NextResponse.json({ success: true, user });
}

// DELETE حذف کاربر (ادمین)
export async function DELETE(req: NextRequest) {
  await connectDB();
  const { id } = await req.json();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
