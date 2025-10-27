"use client";
import styles from "./confirmation.module.css";

export default function ConfirmationPage({ order }) {
  if (!order) return <p className={styles.loading}>در حال بارگذاری...</p>;

  return (
    <div className={styles.confirmationContainer}>
      <h1 className={styles.title}>جزئیات سفارش</h1>

      <div className={styles.infoBox}>
        <p>ایمیل: {order.email}</p>
        <p>شماره تماس: {order.phone}</p>
        <p>
          وضعیت:{" "}
          <span className={
            order.status === "pending"
              ? styles.pending
              : order.status === "approved"
              ? styles.approved
              : styles.rejected
          }>
            {order.status}
          </span>
        </p>
      </div>
    </div>
  );
}
