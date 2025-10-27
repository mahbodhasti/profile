"use client";
import { useEffect, useState } from "react";
import styles from "./confirmation.module.css";

interface ConfirmationStatus {
  status: "pending" | "approved" | "rejected";
}

export default function ConfirmationPage() {
  const [status, setStatus] = useState<ConfirmationStatus["status"]>("pending");
  const userPhone = "09123456789"; // شماره کاربر واقعی یا از احراز هویت

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/confirmations/status?userPhone=${userPhone}`);
        const data = await res.json();
        if (data.status) setStatus(data.status);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStatus();
  }, [userPhone]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {status === "pending" && (
          <>
            <h2>در انتظار تایید</h2>
            <p>درخواست شما هنوز تایید نشده است. لطفاً صبور باشید.</p>
          </>
        )}
        {status === "approved" && (
          <>
            <h2>درخواست تایید شد</h2>
            <p>درخواست شما توسط ادمین تایید شده است.</p>
          </>
        )}
        {status === "rejected" && (
          <>
            <h2>درخواست رد شد</h2>
            <p>درخواست شما توسط ادمین رد شده است.</p>
          </>
        )}
      </div>
    </div>
  );
}
