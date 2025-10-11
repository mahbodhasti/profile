"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const sum = cart.reduce((acc: number, item: any) => acc + parseInt(item.price), 0);
    setTotal(sum);
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-xl font-bold">تسویه حساب</h2>
      <p>مجموع پرداخت: {total.toLocaleString()} تومان</p>

      <button
        onClick={() => router.push("/checkout/zarinpal")}
        className="bg-yellow-500 text-white py-2 w-full rounded"
      >
        پرداخت آنلاین (زرین‌پال)
      </button>

      <button
        onClick={() => router.push("/checkout/card")}
        className="bg-green-600 text-white py-2 w-full rounded"
      >
        پرداخت کارت‌به‌کارت
      </button>
    </div>
  );
}
