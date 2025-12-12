"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./confirmation.module.css";

export default function UserPage({ params }: { params: { email: string } }) {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/orders?userId=${params.email}`);
        const lastOrder = res.data?.[res.data.length - 1];
        setOrder(lastOrder);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [params.email]);

  if (!order) return <p>در حال بارگذاری...</p>;

  return (
    <div className={styles.userContainer}>
      <h2>وضعیت سفارش شما</h2>
      <p>ایمیل: {order.email}</p>
      <p>شماره تماس: {order.phone}</p>
      <p>کد تراکنش: {order.transactionId}</p>

      {order.status === "pending" && <p>⏳ در انتظار تایید ادمین...</p>}
      {order.status === "approved" && <p>✅ سفارش شما تایید شد</p>}
      {order.status === "rejected" && <p>❌ سفارش شما رد شد</p>}
    </div>
  );
}
