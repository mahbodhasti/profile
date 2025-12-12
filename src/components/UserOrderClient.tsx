"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  _id: string;
  email: string;
  phone: string;
  transactionId: string;
  status: "pending" | "approved" | "rejected";
}

export default function UserOrderClient({ userId }: { userId: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`/api/orders?userId=${userId}`);
      setOrders(res.data);
      setLoading(false);
    };
    fetchOrders();
  }, [userId]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (!orders.length) return <p>هیچ سفارش فعالی وجود ندارد.</p>;

  return (
    <div>
      {orders.map((order) => (
        <div key={order._id}>
          <p>ایمیل: {order.email}</p>
          <p>تلفن: {order.phone}</p>
          <p>وضعیت: {order.status}</p>
        </div>
      ))}
    </div>
  );
}
