"use client";
import { useEffect, useState } from "react";
import styles from "./myOrders.module.css"; // استایل دلخواهت

interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  userId: string;
  email: string;
  phone: string;
  items: OrderItem[];
  totalPrice: number;
  transactionId?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const MyOrders = ({ userId }: { userId: string }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/orders?userId=${userId}`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  if (loading) return <p>در حال بارگذاری سفارش‌ها...</p>;

  return (
    <div className={styles.container}>
      <h2>سفارش‌های شما</h2>
      {orders.length === 0 && <p>سفارشی ثبت نشده است</p>}
      {orders.map((order) => (
        <div key={order._id} className={styles.orderCard}>
          <p>
            <strong>ایمیل:</strong> {order.email}
          </p>
          <p>
            <strong>شماره تماس:</strong> {order.phone}
          </p>
          <p>
            <strong>تراکنش:</strong> {order.transactionId || "نامشخص"}
          </p>
          <p>
            <strong>وضعیت:</strong>{" "}
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
          <h4>محصولات:</h4>
          <ul>
            {order.items.map((item) => (
              <li key={item.productId}>
                {item.title} × {item.quantity} - {item.price * item.quantity} تومان
              </li>
            ))}
          </ul>
          <p>
            <strong>جمع کل:</strong> {order.totalPrice} تومان
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
