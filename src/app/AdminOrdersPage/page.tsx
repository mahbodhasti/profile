"use client";
import React, { useEffect, useState } from "react";
import styles from "./AdminOrdersPage.module.css";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

interface Order {
  _id: string;
  paymentId: string;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: "confirmed" | "rejected") => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const updatedOrder = await res.json();
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? updatedOrder : o))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className={styles.loading}>⏳ در حال بارگذاری...</div>;

  if (orders.length === 0)
    return <div className={styles.empty}>هنوز سفارشی ثبت نشده است.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🛠 مدیریت سفارش‌ها</h1>

      <div className={styles.list}>
        {orders.map((order) => {
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
                <span className={styles.paymentId}>
                  شناسه پرداخت: {order.paymentId}
                </span>
                <span className={styles.date}>
                  {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </div>

              <div className={styles.divider}></div>

              <div className={styles.rowBottom}>
                <p className={styles.price}>
                  💰 جمع کل:{" "}
                  <span className={styles.priceValue}>
                    {order.totalPrice
                      ? Number(order.totalPrice).toLocaleString()
                      : "—"}{" "}
                    تومان
                  </span>
                </p>

                <div className={styles.status}>
                  {icon}
                  <span>{statusText}</span>
                </div>
              </div>

              {order.status === "pending" && (
                <div className={styles.actions}>
                  <button
                    className={styles.confirmBtn}
                    onClick={() => updateStatus(order._id, "confirmed")}
                  >
                    تأیید
                  </button>
                  <button
                    className={styles.rejectBtn}
                    onClick={() => updateStatus(order._id, "rejected")}
                  >
                    رد
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
