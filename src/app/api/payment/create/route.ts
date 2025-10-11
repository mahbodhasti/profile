import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { cart } = await req.json();

  // جمع کل را محاسبه می‌کنیم
  const amount = cart.reduce((sum: number, item: any) => {
    const priceNumber = parseInt(item.price.replace(/,/g, "").replace(" تومان", ""));
    return sum + priceNumber * item.quantity;
  }, 0);

  // کلید زرین‌پال شما
  const MERCHANT = "YOUR_ZARINPAL_MERCHANT_CODE";

  const callback_url = "https://yourdomain.com/cart/verify"; // بعد از پرداخت هدایت

  const res = await fetch("https://sandbox.zarinpal.com/pg/rest/WebGate/PaymentRequest.json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      MerchantID: MERCHANT,
      Amount: amount,
      Description: "پرداخت سبد خرید",
      CallbackURL: callback_url
    })
  });

  const data = await res.json();

  if (data.Status === 100) {
    return NextResponse.json({ payment_url: `https://sandbox.zarinpal.com/pg/StartPay/${data.Authority}` });
  } else {
    return NextResponse.json({ error: "خطا در ایجاد پرداخت", data });
  }
}
