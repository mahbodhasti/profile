import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import Confirmation from "../../../../components/modules/confirmation/Confirmation";


export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userPhone = req.nextUrl.searchParams.get("userPhone");
    if (!userPhone) return NextResponse.json({ error: "شماره کاربر لازم است" }, { status: 400 });

    const confirmations = await Confirmation.find({ userPhone }).sort({ createdAt: -1 }).limit(1);
    if (confirmations.length === 0) return NextResponse.json({ status: "pending" });

    return NextResponse.json({ status: confirmations[0].status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در دریافت وضعیت" }, { status: 500 });
  }
}
