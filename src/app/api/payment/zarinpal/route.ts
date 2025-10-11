import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount } = await req.json();

  const res = await fetch("https://api.zarinpal.com/pg/v4/payment/request.json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchant_id: process.env.ZARINPAL_MERCHANT_ID,
      amount,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/checkout/verify`,
      description: "پرداخت فروشگاه Thunder",
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
