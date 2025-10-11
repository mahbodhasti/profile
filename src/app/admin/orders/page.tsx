"use client";
import React, { useEffect, useState } from "react";
import styles from "./AdminOrdersPage.module.css";

interface Order {
  _id: string;
  userEmail: string;
  paymentId: string;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (Array.isArray(data)) setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("آیا مطمئن هستید که می‌خواهید این سفارش را حذف کنید؟")) return;
    const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) fetchOrders();
    else alert(data.message);
  };

  const handleStatusChange = async (id: string, status: string) => {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.success) fetchOrders();
    else alert(data.message);
  };

  if (loading) return <div className={styles.loading}>⏳ در حال بارگذاری سفارش‌ها...</div>;
  if (!orders.length) return <div className={styles.empty}>هنوز سفارشی ثبت نشده است.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🧾 مدیریت سفارش‌ها</h1>
      <div className={styles.ordersGrid}>
        {orders.map(o => (
          <div key={o._id} className={styles.card}>
            <p><strong>ایمیل کاربر:</strong> {o.userEmail}</p>
            <p><strong>شناسه پرداخت:</strong> {o.paymentId}</p>
            <p><strong>جمع کل:</strong> {o.totalPrice?.toLocaleString()} تومان</p>
            <p><strong>وضعیت:</strong> {o.status}</p>
            <p><strong>تاریخ:</strong> {new Date(o.createdAt).toLocaleString("fa-IR")}</p>

            <div className={styles.actions}>
              <button onClick={() => handleStatusChange(o._id, "confirmed")} className={styles.confirm}>تأیید</button>
              <button onClick={() => handleStatusChange(o._id, "rejected")} className={styles.reject}>رد</button>
              <button onClick={() => handleDelete(o._id)} className={styles.delete}>حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
