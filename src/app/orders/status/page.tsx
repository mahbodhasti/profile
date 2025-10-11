"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./OrderStatusPage.module.css";

interface Order {
  _id: string;
  totalPrice: number;
  status: string;
  paymentId: string;
  createdAt: string;
}

export default function OrderStatusPage() {
  const searchParams = useSearchParams();
  const userEmail = searchParams.get("userEmail") || "";
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders?userEmail=${encodeURIComponent(userEmail)}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setOrders(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userEmail]);

  if (loading) return <div className={styles.loading}>⏳ در حال بارگذاری...</div>;
  if (orders.length === 0) return <div className={styles.empty}>هنوز سفارشی ثبت نکرده‌اید.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🧾 وضعیت سفارش‌ها</h1>
      <div className={styles.list}>
        {orders.map(order => {
          let cardClass = "";
          let statusText = "";

          switch (order.status) {
            case "pending":
              cardClass = styles.pending;
              statusText = "⏳ در انتظار تأیید";
              break;
            case "confirmed":
              cardClass = styles.confirmed;
              statusText = "✅ تأیید شده";
              break;
            case "rejected":
              cardClass = styles.rejected;
              statusText = "❌ رد شده";
              break;
            default:
              cardClass = styles.default;
              statusText = "نامشخص";
          }

          return (
            <div key={order._id} className={`${styles.card} ${cardClass}`}>
              <div className={styles.topBar}></div>
              <div className={styles.row}>
                <span>شناسه پرداخت: {order.paymentId}</span>
                <span>{new Date(order.createdAt).toLocaleDateString("fa-IR")}</span>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.rowBottom}>
                <p>💰 جمع کل: {order.totalPrice.toLocaleString()} تومان</p>
                <p>وضعیت: {statusText}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
