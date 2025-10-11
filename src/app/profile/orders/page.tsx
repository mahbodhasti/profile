"use client";
import { useEffect, useState } from "react";
import styles from "./orders.module.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) { setLoading(false); return; }
    fetch(`/api/orders/${userId}`)
      .then(r => r.json())
      .then(data => { if (data.success) setOrders(data.orders); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    <div className={styles.container}>
      <h2>سفارش‌های من</h2>
      {orders.length === 0 ? <p>سفارشی ثبت نشده.</p> : (
        <table className={styles.table}>
          <thead><tr><th>کد</th><th>تاریخ</th><th>جمع کل</th><th>وضعیت</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id}>
                <td>{o.orderCode}</td>
                <td>{new Date(o.createdAt).toLocaleString("fa-IR")}</td>
                <td>{o.total.toLocaleString()} تومان</td>
                <td>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
