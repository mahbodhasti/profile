import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import User from "../../../../models/User";


export async function POST(req: Request) {
  await connectDB();

  const { name, email, password } = await req.json();

  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json({ error: "ایمیل قبلاً ثبت شده" }, { status: 400 });
  }

  const user = await User.create({ name, email, password });

  return NextResponse.json({ message: "ثبت‌نام موفق" });
}
