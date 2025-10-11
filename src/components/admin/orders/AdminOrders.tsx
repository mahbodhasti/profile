"use client";
import React, { useEffect, useState } from "react";
import styles from "./adminOrders.module.css";

interface Order {
  _id: string;
  paymentId: string;
  totalPrice: number;
  status: "pending" | "approved" | "rejected";
  items: { title: string; quantity: number }[];
  userEmail: string;
  createdAt: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) fetchOrders();
      else alert("❌ خطا در تغییر وضعیت سفارش");
    } catch {
      alert("❌ خطا در ارتباط با سرور");
    }
  };

  if (loading) return <div className={styles.loading}>⏳ در حال بارگذاری...</div>;
  if (!orders.length) return <div className={styles.empty}>هنوز سفارشی ثبت نشده است.</div>;

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>📦 مدیریت سفارش‌ها</h2>
      <div className={styles.list}>
        {orders.map((o) => (
          <div key={o._id} className={`${styles.card} ${o.status === "pending" ? styles.pending : o.status === "approved" ? styles.approved : styles.rejected}`}>
            <div className={styles.row}>
              <div>
                <div className={styles.payId}>شناسه پرداخت: {o.paymentId}</div>
                <div className={styles.email}>کاربر: {o.userEmail}</div>
                <div className={styles.date}>{new Date(o.createdAt).toLocaleString("fa-IR")}</div>
              </div>
              <div className={styles.statusText}>
                {o.status === "pending" ? "⏳ در انتظار" : o.status === "approved" ? "✅ تأیید شده" : "❌ رد شده"}
              </div>
            </div>
            <div className={styles.items}>
              {o.items.map((it, idx) => (
                <div key={idx} className={styles.itemRow}>
                  <span>{it.title}</span>
                  <span>×{it.quantity}</span>
                </div>
              ))}
            </div>
            <div className={styles.total}>مبلغ: {o.totalPrice.toLocaleString()} تومان</div>
            {o.status === "pending" && (
              <div className={styles.actions}>
                <button className={styles.approveBtn} onClick={() => updateStatus(o._id, "approved")}>تأیید</button>
                <button className={styles.rejectBtn} onClick={() => updateStatus(o._id, "rejected")}>رد</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
