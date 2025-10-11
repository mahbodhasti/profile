"use client";
import React, { useEffect, useState } from "react";
import styles from "./AdminOrders.module.css";

interface Order {
  _id: string;
  totalPrice: number;
  status: string;
  paymentId: string;
  createdAt: string;
  items: { title: string; quantity: number; price: string }[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders/admin")
      .then(res => res.json())
      .then(data => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  const changeStatus = async (orderId: string, status: string) => {
    const res = await fetch("/api/orders/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    });
    const result = await res.json();
    if (result.success) {
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o));
    } else {
      alert("خطا در تغییر وضعیت سفارش!");
    }
  };

  if (loading) return <div className={styles.loading}>⏳ در حال بارگذاری...</div>;
  if (orders.length === 0) return <div className={styles.empty}>سفارشی ثبت نشده است.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🛒 مدیریت سفارش‌ها</h1>
      <div className={styles.list}>
        {orders.map(order => (
          <div key={order._id} className={styles.card}>
            <div className={styles.row}>
              <span>شناسه پرداخت: {order.paymentId}</span>
              <span>{new Date(order.createdAt).toLocaleDateString("fa-IR")}</span>
            </div>
            <div className={styles.items}>
              {order.items.map((item, i) => (
                <div key={i}>{item.title} × {item.quantity} - {item.price}</div>
              ))}
            </div>
            <div className={styles.rowBottom}>
              <span>جمع کل: {order.totalPrice.toLocaleString()} تومان</span>
              <span>وضعیت: {order.status}</span>
            </div>
            <div className={styles.actions}>
              {order.status !== "confirmed" && <button onClick={() => changeStatus(order._id, "confirmed")}>تایید</button>}
              {order.status !== "rejected" && <button onClick={() => changeStatus(order._id, "rejected")}>رد</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
