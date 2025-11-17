"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  userId: number;
  items: OrderItem[];
  totalPrice: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function MyOrders({ userId }: { userId: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/orders?userId=${userId}`).then(res => {
      setOrders(res.data);
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    
    <div style={{ padding: "20px" }}>
      <h2>سفارش‌های من</h2>
      {orders.length === 0 ? (
        <p>هیچ سفارشی ثبت نشده.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 15 }}>
            <p>کد سفارش: {order._id}</p>
            <p>وضعیت: {order.status}</p>
            <p>جمع کل: {order.totalPrice} تومان</p>
          </div>
        ))
      )}
    </div>
  );
}
