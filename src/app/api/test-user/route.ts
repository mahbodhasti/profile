import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/mongodb";
import User from "../../../../models/User";


export async function GET() {
  await connectDB();

  const existing = await User.findOne({ email: "test@example.com" });
  if (existing) {
    return NextResponse.json({ message: "کاربر تستی از قبل وجود دارد." });
  }

  const hashedPassword = await bcrypt.hash("123456", 10);
  const user = new User({
    name: "کاربر تستی",
    email: "test@example.com",
    password: hashedPassword,
  });
  await user.save();

  return NextResponse.json({ message: "کاربر تستی ایجاد شد!", email: "test@example.com", password: "123456" });
}
