"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  transactionId?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  email?: string;
  phone?: string;
}

export default function MyOrders({ userId }: { userId: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`/api/orders?userId=${userId}`);
        setOrders(res.data);
      } catch (err) {
        setError("خطا در دریافت سفارش‌ها");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  if (loading) return <p>در حال بارگذاری سفارش‌ها...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>سفارش‌های من</h2>
      {orders.length === 0 && <p>هیچ سفارشی ثبت نشده</p>}
      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 20, borderRadius: 8 }}>
          <p>ایمیل: {order.email}</p>
          <p>تلفن: {order.phone}</p>
          <p>تراکنش: {order.transactionId}</p>
          <p>
            وضعیت:{" "}
            <span style={{
              color: order.status === "approved" ? "green" : order.status === "rejected" ? "red" : "orange",
              fontWeight: "bold"
            }}>
              {order.status === "pending" ? "در انتظار" : order.status === "approved" ? "تأیید شده" : "رد شده"}
            </span>
          </p>
          <ul>
            {order.items.map((item) => (
              <li key={item.productId}>{item.title} × {item.quantity} - {item.price * item.quantity} تومان</li>
            ))}
          </ul>
          <p>جمع کل: {order.totalPrice} تومان</p>
        </div>
      ))}
    </div>
  );
}
