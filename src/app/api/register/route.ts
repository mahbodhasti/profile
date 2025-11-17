import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/mongodb";
import User from "../../../../models/User";


export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password)
      return NextResponse.json({ error: "تمام فیلدها الزامی‌اند." }, { status: 400 });

    await connectDB();

    const existing = await User.findOne({ email });
    if (existing)
      return NextResponse.json({ error: "این ایمیل قبلاً ثبت شده است." }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();

    return NextResponse.json({ message: "ثبت‌نام با موفقیت انجام شد" }, { status: 201 });
  } catch (err) {
    console.error("Error during registration:", err);
    return NextResponse.json({ error: "مشکلی پیش آمده است." }, { status: 500 });
  }
}
