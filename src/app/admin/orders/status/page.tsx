/**
 * مسیر: src/app/orders/status/page.tsx
 * توضیح: صفحه وضعیت سفارش‌ها برای کاربر
 * وظایف:
 * 1. نمایش لیست سفارش‌های کاربر
 * 2. نشان دادن وضعیت هر سفارش (pending, confirmed, rejected)
 * 3. نمایش جمع کل، شناسه پرداخت و تاریخ سفارش
 * 4. استفاده از آیکون‌های Lucide برای وضعیت
 * وابستگی‌ها:
 * - lucide-react برای آیکون‌ها
 * - OrderStatusPage.module.css برای استایل
 */

"use client";
import React, { useEffect, useState } from "react";
import styles from "./OrderStatusPage.module.css";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

interface Order {
  _id: string;
  totalPrice: number;
  status: string;
  paymentId: string;
  createdAt: string;
}

export default function OrderStatusPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // بارگذاری سفارش‌ها
  useEffect(() => {
    fetch("/api/orders")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setOrders(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.loading}>⏳ در حال بارگذاری...</div>;
  if (!orders.length) return <div className={styles.empty}>هنوز سفارشی ثبت نکرده‌اید.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🧾 وضعیت سفارش‌ها</h1>

      <div className={styles.list}>
        {orders.map(order => {
          let cardClass = "";
          let icon;
          let statusText = "";

          switch (order.status) {
            case "pending":
              cardClass = styles.pending;
              icon = <Clock className={styles.iconOrange} />;
              statusText = "⏳ در انتظار تأیید";
              break;
            case "confirmed":
              cardClass = styles.confirmed;
              icon = <CheckCircle2 className={styles.iconBlue} />;
              statusText = "✅ تأیید شده";
              break;
            case "rejected":
              cardClass = styles.rejected;
              icon = <XCircle className={styles.iconPurple} />;
              statusText = "❌ رد شده";
              break;
            default:
              cardClass = styles.default;
              icon = <Clock className={styles.iconGray} />;
              statusText = "نامشخص";
          }

          return (
            <div key={order._id} className={`${styles.card} ${cardClass}`}>
              <div className={styles.topBar}></div>
              <div className={styles.row}>
                <span className={styles.paymentId}>شناسه پرداخت: {order.paymentId}</span>
                <span className={styles.date}>{new Date(order.createdAt).toLocaleDateString("fa-IR")}</span>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.rowBottom}>
                <p className={styles.price}>
                  💰 جمع کل: <span className={styles.priceValue}>{order.totalPrice ? Number(order.totalPrice).toLocaleString() : "—"} تومان</span>
                </p>
                <div className={styles.status}>
                  {icon} <span>{statusText}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
