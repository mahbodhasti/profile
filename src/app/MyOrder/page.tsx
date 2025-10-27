"use client";
import React, { useEffect, useState } from "react";

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
}

const MyOrders: React.FC<{ userId: string }> = ({ userId }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch(`/api/orders?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [userId]);

  return (
    <div>
      <h2>سفارش‌های من</h2>
      {orders.length === 0 && <p>سفارشی ثبت نشده</p>}
      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <p>تراکنش: {order.transactionId}</p>
          <p>وضعیت: {order.status}</p>
          <ul>
            {order.items.map((item) => (
              <li key={item.productId}>
                {item.title} × {item.quantity} - {item.price * item.quantity} تومان
              </li>
            ))}
          </ul>
          <p>جمع کل: {order.totalPrice} تومان</p>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
