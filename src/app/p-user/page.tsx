"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Orders.module.css"

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  _id: string;
  email: string;
  phone?: string;
  transactionId: string;
  items: OrderItem[];
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface MyOrdersProps {
  userId: string;
}

export default function MyOrders({ userId }: MyOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`/api/orders?userId=${userId}`);
        setOrders(res.data);
      } catch (err: any) {
        setError(err.message || "خطا در دریافت سفارش‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <p className={styles.loading}>در حال بارگذاری...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  if (orders.length === 0) return <p className={styles.empty}>هیچ سفارشی ثبت نشده است.</p>;

  return (
    <div className={styles.container}>
      <h2>سفارش‌های من</h2>
      {orders.map((order) => (
        <div key={order._id} className={styles.orderCard}>
          <p>ایمیل: {order.email}</p>
          {order.phone && <p>تلفن: {order.phone}</p>}
          <p>تراکنش: {order.transactionId}</p>
          <p>
            وضعیت:{" "}
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
          </p>
          <div className={styles.items}>
            {order.items.map((item) => (
              <div key={item.productId} className={styles.item}>
                {item.image && <img src={item.image} alt={item.title} />}
                <p>{item.title}</p>
                <p>
                  {item.quantity} × {item.price.toLocaleString()} تومان
                </p>
              </div>
            ))}
          </div>
          <p>جمع کل: {order.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toLocaleString()} تومان</p>
        </div>
      ))}
    </div>
  );
}
