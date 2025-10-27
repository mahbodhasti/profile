// src/app/my-orders/[userId]/page.tsx
"use client";
import { useEffect, useState } from "react";
import styles from "./myOrders.module.css";

interface Order {
  _id: string;
  userId: string;
  items: any[];
  total: number;
  email: string;
  transactionId: string;
  status: string;
  createdAt: string;
}

export default function MyOrders({ params }: { params: { userId: string } }) {
  const userId = params.userId;
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/orders?userId=${userId}`);
      const data = await res.json();
      setOrders(data);
    }
    load();
  }, [userId]);

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: 20 }}>
      <h2>سفارش‌های من</h2>
      {orders.length === 0 && <p>شما هنوز سفارشی ثبت نکرده‌اید.</p>}
      {orders.map(o => (
        <div key={o._id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 10, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent:"space-between" }}>
            <div>
              <strong>تراکنش:</strong> {o.transactionId}<br/>
              <strong>ایمیل:</strong> {o.email}
            </div>
            <div>
              <strong>وضعیت:</strong> <span style={{ fontWeight: 800 }}>{o.status}</span>
            </div>
          </div>

          <ul>
            {o.items.map((it: any) => (
              <li key={it.productId}>{it.title} — {it.quantity} × {it.price.toLocaleString()} تومان</li>
            ))}
          </ul>
          <div style={{ textAlign: "right", fontWeight: 800 }}>جمع: {o.total.toLocaleString()} تومان</div>
        </div>
      ))}
    </div>
  );
}
