"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./userPage.module.css";

export default function UserPage({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`/api/orders?userId=${userId}`);
        const lastOrder = res.data?.[0];
        setStatus(lastOrder?.status || "pending");
      } catch {
        setStatus("error");
      }
    };
    fetchStatus();
  }, [userId]);

  return (
    <div className={styles.userContainer}>
      <h2 className={styles.title}>خوش آمدید، {userId}</h2>
      {status === "pending" && <p>⏳ سفارش شما در انتظار تأیید است...</p>}
      {status === "approved" && <p>✅ سفارش شما تأیید شد!</p>}
      {status === "rejected" && <p>❌ سفارش شما رد شد.</p>}
      {status === "error" && <p>⚠️ خطا در دریافت وضعیت سفارش.</p>}
    </div>
  );
}
