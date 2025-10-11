"use client";
import { useState } from "react";

export default function CardPaymentPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    alert("رسید شما ثبت شد ✅ منتظر تایید ادمین باشید.");
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-lg font-semibold">پرداخت کارت‌به‌کارت</h2>
      <p>لطفاً مبلغ را به شماره کارت زیر واریز کنید:</p>
      <div className="bg-gray-100 p-3 rounded text-center">6037-9917-0000-0000 (بانک ملی)</div>

      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white py-2 w-full rounded"
      >
        ارسال رسید پرداخت
      </button>
    </div>
  );
}
