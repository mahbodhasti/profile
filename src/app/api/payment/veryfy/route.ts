import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import Order from "@/models/Order";
import fetch from "node-fetch";

const ZARINPAL_VERIFY = "https://api.zarinpal.com/rest/v3/requests/verify";
const MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID!;

export async function GET(request: Request) {
  await connectDB();

  const url = new URL(request.url);
  const authority = url.searchParams.get("authority");
  const orderId = url.searchParams.get("orderId");

  if (!orderId || !authority) {
    return NextResponse.json({ error: "پارامترهای نامعتبر" }, { status: 400 });
  }

  const order = await Order.findById(orderId);
  if (!order) return NextResponse.json({ error: "سفارش یافت نشد" }, { status: 404 });

  const payload = {
    merchant_id: MERCHANT_ID,
    authority,
    amount: order.totalPrice * 10,
  };

  const res = await fetch(ZARINPAL_VERIFY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (data.data?.code === 100) {
    // پرداخت موفق
    order.status = "paid";
    order.refId = data.data.ref_id;
    await order.save();
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?ref=${data.data.ref_id}&orderId=${order._id}`);
  } else {
    order.status = "failed";
    await order.save();
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/checkout/fail?orderId=${order._id}`);
  }
}
