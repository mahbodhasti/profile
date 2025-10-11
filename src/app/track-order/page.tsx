"use client";
import React, { useState } from "react";
import styles from "./track-order.module.css";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleTrack() {
    if (!orderId) return alert("شناسه سفارش را وارد کنید");

    const res = await fetch(`/api/orders/${orderId}`);
    const data = await res.json();

    if (res.ok) {
      setOrder(data);
      setError("");
    } else {
      setOrder(null);
      setError(data.error || "خطا در دریافت سفارش");
    }
  }

  return (
    <div className={styles.container}>
      <h2>پیگیری سفارش</h2>
      <div className={styles.form}>
        <input
          placeholder="شناسه سفارش"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button onClick={handleTrack}>پیگیری</button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {order && (
        <div className={styles.orderDetails}>
          <h3>جزئیات سفارش: {order.orderId}</h3>
          <p>وضعیت: {order.status}</p>
          <p>روش پرداخت: {order.method}</p>
          <p>جمع کل: {order.total.toLocaleString()} تومان</p>
          <div>
            <h4>محصولات:</h4>
            <ul>
              {order.items.map((item: any) => (
                <li key={item._id}>
                  {item.title} x {item.quantity} = {(parseInt(item.price.replace(/,/g,"").replace(" تومان",""))*item.quantity).toLocaleString()} تومان
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
