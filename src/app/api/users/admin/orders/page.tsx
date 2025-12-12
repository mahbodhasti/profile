"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./orders.module.css"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get("/api/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    await axios.patch("/api/orders", { orderId, status: newStatus });
    fetchOrders();
  };

  return (
    <div className={styles.container}>
      <h1>مدیریت سفارش‌ها</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>کاربر</th>
            <th>ایمیل</th>
            <th>تلفن</th>
            <th>تراکنش</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr key={order._id}>
              <td>{order.userId}</td>
              <td>{order.email}</td>
              <td>{order.phone}</td>
              <td>{order.transactionId}</td>
              <td>
                <span
                  className={
                    order.status === "approved"
                      ? styles.approved
                      : order.status === "rejected"
                      ? styles.rejected
                      : styles.pending
                  }
                >
                  {order.status === "pending"
                    ? "در انتظار"
                    : order.status === "approved"
                    ? "تأیید شده"
                    : "رد شده"}
                </span>
              </td>
              <td>
                <button onClick={() => handleStatusChange(order._id, "approved")}>
                  ✅ تأیید
                </button>
                <button onClick={() => handleStatusChange(order._id, "rejected")}>
                  ❌ رد
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
