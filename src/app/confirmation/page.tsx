"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./confirmation.module.css";

export default function ConfirmationPage() {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get("/api/orders?userId=demo-user");
        const lastOrder = res.data?.[res.data.length - 1];
        setOrder(lastOrder);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, []);

  if (loading) return <p className={styles.loading}>در حال بارگذاری...</p>;

  if (!order) return <p className={styles.error}>هیچ سفارشی یافت نشد</p>;

  return (
    <div className={styles.title}>
      <h2>وضعیت سفارش شما</h2>
      <div className={styles.infoBox}>
        <p>📧 ایمیل: {order.email}</p>
        <p>📞 شماره تماس: {order.phone}</p>
        <p>💳 شماره تراکنش: {order.transactionId || "در حال بررسی..."}</p>
      </div>

      {order.status === "pending" && (
        <p className={styles.pending}>⏳ در انتظار تأیید ادمین...</p>
      )}
      {order.status === "approved" && (
        <p className={styles.approved}>✅ سفارش شما تأیید شد</p>
      )}
      {order.status === "rejected" && (
        <p className={styles.rejected}>❌ سفارش شما رد شد</p>
      )}
    </div>
  );
}
