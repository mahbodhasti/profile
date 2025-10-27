// src/app/admin/orders/page.tsx
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
    <div style={{ maxWidth: 1000, margin: "2rem auto", padding: 12 }}>
      <h2>مدیریت سفارش‌ها</h2>
      {orders.map(o => (
        <div key={o._id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 10, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div><strong>کاربر:</strong> {o.userId}</div>
            <div><strong>وضعیت:</strong> {o.status}</div>
          </div>
          <div style={{ marginTop: 8 }}>
            <button onClick={() => updateStatus(o._id, "approved")} style={{ marginRight: 8 }}>تایید</button>
            <button onClick={() => updateStatus(o._1d, "rejected")}>رد</button>
          </div>
        </div>
      ))}
    </div>
  );
}
