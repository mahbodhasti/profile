"use client";

import { useEffect, useState } from "react";

interface Order {
  _id: string;
  email: string;
  phone: string;
  transactionId: string;
  items: any[];
  totalPrice: number;
  status: string;
  createdAt: string;
}

interface MyOrdersProps {
  userId: string;
}

export default function MyOrders({ userId }: MyOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(`/api/orders/user/${userId}`);
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    }

    fetchOrders();
  }, [userId]);

  return (
    <div style={{ maxWidth: 800, margin: "50px auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>سفارش‌های من</h2>
      {orders.length === 0 && <p style={{ textAlign: "center" }}>سفارشی ثبت نشده است.</p>}
      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #aaa",
            borderRadius: 10,
            padding: 20,
            marginBottom: 20,
            backgroundColor: "#f9f9f9",
          }}
        >
          <p><strong>ایمیل:</strong> {order.email}</p>
          <p><strong>شماره تلفن:</strong> {order.phone}</p>
          <p><strong>شماره تراکنش:</strong> {order.transactionId}</p>
          <p><strong>جمع کل:</strong> {order.totalPrice} تومان</p>
          <p><strong>وضعیت:</strong> {order.status}</p>
          <p><strong>تاریخ خرید:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
