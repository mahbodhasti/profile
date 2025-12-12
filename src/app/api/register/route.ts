import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const client = new MongoClient(process.env.MONGODB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectDB() {
  if (!client.isConnected()) await client.connect();
  return client.db("profile");
}

// متد POST برای ثبت‌نام
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "همه فیلدها الزامی است" }, { status: 400 });
    }

    const db = await connectDB();
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: "کاربر موجود است" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection("users").insertOne({ email, password: hashedPassword });

    return NextResponse.json({ message: "ثبت‌نام موفق" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "خطا در سرور" }, { status: 500 });
  }
}
