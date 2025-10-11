"use client";

import { useEffect, useState } from "react";

interface Order {
  _id: string;
  items: {
    title: string;
    quantity: number;
    price: string;
  }[];
  totalPrice: number;
  status: string;
  paymentId: string;
  createdAt?: string;
}

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => setOrders(data))
      .catch(console.error);
  }, []);

  if (!orders.length)
    return <p className="text-center mt-10">هیچ سفارشی ثبت نشده است.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-5 text-center">📦 سفارش‌های من</h2>
      {orders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-sm"
        >
          <p>کد پرداخت: <strong>{order.paymentId}</strong></p>
          <p>مبلغ کل: {order.totalPrice?.toLocaleString() ?? "0"} تومان</p>
          <p>وضعیت: {order.status || "در انتظار تأیید"}</p>

         <div className="mt-3">
  <p className="font-semibold">محصولات:</p>
  {Array.isArray(order.items) && order.items.length > 0 ? (
    order.items.map((it, i) => (
      <div key={i} className="text-sm text-gray-700 border-b py-1">
        {it.title} × {it.quantity} — {it.price}
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-sm">هیچ محصولی در این سفارش ثبت نشده است.</p>
  )}
</div>

          {order.createdAt && (
            <p className="text-xs text-gray-500 mt-2">
              تاریخ: {new Date(order.createdAt).toLocaleString("fa-IR")}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
