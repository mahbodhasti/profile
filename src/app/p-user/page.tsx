"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Orders.module.css";

interface Order {
  _id: string;
  email: string;
  transactionId: string;
  cart: { id: string | number; title: string; price: string; image: string }[];
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function OrdersPage() {
  const userId = "demo-user"; // بعدا با Auth واقعی جایگزین شود
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios.get(`/api/orders?userId=${userId}`).then(res => setOrders(res.data));
  }, []);

  return (
    <div className={styles.container}>
      <h2>سفارش‌های شما</h2>
      {orders.length === 0 && <p>هیچ سفارشی ثبت نشده است.</p>}
      {orders.map(order => (
        <div key={order._id} className={styles.orderCard}>
          <p>ایمیل: {order.email}</p>
          <p>تراکنش: {order.transactionId}</p>
          <p>وضعیت: <span className={styles[order.status]}>{order.status}</span></p>
          <div className={styles.cartItems}>
            {order.cart.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.title} />
                <p>{item.title}</p>
                <p>{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
