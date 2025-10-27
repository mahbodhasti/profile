import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Confirmation from "../../../components/modules/confirmation/Confirmation";


export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userPhone, recipientPhone } = await req.json();

    if (!userPhone || !recipientPhone) {
      return NextResponse.json({ error: "اطلاعات ناقص است" }, { status: 400 });
    }

    const confirmation = new Confirmation({ userPhone, recipientPhone });
    await confirmation.save();

    return NextResponse.json({ success: true, confirmation });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در ثبت درخواست" }, { status: 500 });
  }
}

