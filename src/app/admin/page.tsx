"use client";
import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    }
    load();
  }, []);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrders(prev => prev.map(o => (o._id === id ? { ...o, status } : o)));
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">مدیریت سفارش‌ها</h2>
      {orders.map(o => (
        <div
          key={o._id}
          className="border rounded-xl p-4 mb-4 shadow-sm flex justify-between items-center bg-white"
        >
          <div>
            <p><strong>کاربر:</strong> {o.email}</p>
            <p><strong>شماره:</strong> {o.phone}</p>
            <p><strong>وضعیت:</strong> <span className="text-blue-600">{o.status}</span></p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => updateStatus(o._id, "approved")}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              تایید
            </button>
            <button
              onClick={() => updateStatus(o._id, "rejected")}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              رد
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
