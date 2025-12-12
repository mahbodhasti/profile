"use client";
import { useSearchParams } from "next/navigation";

export default function WaitingPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");

  if (!orderId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        <h1 className="text-3xl font-bold mb-4">در انتظار هیچ سفارشی نیستید ❌</h1>
        <p>لطفاً از صفحه ثبت سفارش اقدام کنید.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-800">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">سفارش شما در حال بررسی است ✅</h2>
        <p>شناسه سفارش: <span className="font-mono text-gray-600">{orderId}</span></p>
        <p>ایمیل: {email}</p>
        <p>شماره تلفن: {phone}</p>

        <div className="loader mx-auto my-6"></div>
        <p className="text-sm text-gray-500">
          لطفاً منتظر بمانید تا نتیجه از طریق ایمیل یا پیامک اطلاع داده شود.
        </p>
      </div>

      <style jsx>{`
        .loader {
          border: 5px solid #e0e0e0;
          border-top: 5px solid #3b82f6;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
