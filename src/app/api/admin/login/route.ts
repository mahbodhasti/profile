import { NextRequest, NextResponse } from "next/server";

// رمز عبور ادمین (می‌تونیم بعداً از env بگیریم)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "123456";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if(password === ADMIN_PASSWORD) {
    // می‌توانیم توکن ساده JWT بسازیم یا فقط یک flag ست کنیم
    return NextResponse.json({ ok: true, token: "admin-token" });
  } else {
    return NextResponse.json({ ok: false, error: "رمز اشتباه است" });
  }
}
