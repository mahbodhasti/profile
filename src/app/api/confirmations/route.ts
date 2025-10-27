// src/app/api/confirmations/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "GET confirmations" });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  // ذخیره در DB
  return NextResponse.json({ message: "Confirmation created", data });
}
