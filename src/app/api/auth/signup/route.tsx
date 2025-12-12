import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/User";


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password, name } = await req.json();
    if (!email || !password || !name) {
      return NextResponse.json({ error: "تمام فیلدها ضروری هستند" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "کاربر از قبل وجود دارد" }, { status: 400 });
    }

    const newUser = await User.create({ email, password, name });
    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "خطای سرور" }, { status: 500 });
  }
}
