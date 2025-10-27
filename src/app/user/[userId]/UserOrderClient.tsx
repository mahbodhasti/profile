"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  _id: string;
  email: string;
  phone: string;
  status: "pending" | "approved" | "rejected";
}

export default function UserOrderClient({ userId }: { userId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastOrder = async () => {
      try {
        const res = await axios.get(`/api/orders?userId=${userId}`);
        const orders: Order[] = res.data;
        if (orders.length > 0) setOrder(orders[orders.length - 1]);
      } catch (err) {
        console.error("❌ خطا در دریافت سفارش:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLastOrder();
  }, [userId]);

  if (loading) return <p className="text-center mt-4">در حال بارگذاری...</p>;
  if (!order) return <p className="text-center mt-4">هیچ سفارشی یافت نشد.</p>;

  const statusColor =
    order.status === "approved"
      ? "text-green-600"
      : order.status === "rejected"
      ? "text-red-600"
      : "text-yellow-600";

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 text-center w-[350px] mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">سفارش شما</h2>
      <p>
        <strong>ایمیل:</strong> {order.email}
      </p>
      <p>
        <strong>تلفن:</strong> {order.phone}
      </p>
      <p className={`mt-3 font-semibold ${statusColor}`}>
        وضعیت: {order.status === "pending"
          ? "در انتظار تأیید"
          : order.status === "approved"
          ? "تأیید شده"
          : "رد شده"}
      </p>
    </div>
  );
}
