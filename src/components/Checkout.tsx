// src/components/Checkout.tsx
"use client";
import { useState } from "react";
import axios from "axios";

interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

interface CheckoutProps {
  cartItems: CartItem[];
  userId: string;
  email: string;
  phone?: string;
}

export default function Checkout({ cartItems, userId, email, phone }: CheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // اینجا تراکنش رو شبیه‌سازی میکنیم
      const transactionId = "TXN-" + Date.now(); // در عمل از درگاه واقعی بگیرید

      const res = await axios.post("/api/orders", {
        items: cartItems,
        userId,
        email,
        phone,
        transactionId,
      });

      console.log("✅ Order created:", res.data);
      setSuccess(true);
    } catch (err: any) {
      console.error("❌ Checkout error:", err.response?.data || err.message);
      alert("خطا در ثبت سفارش");
    } finally {
      setLoading(false);
    }
  };

  if (success) return <p>سفارش شما ثبت شد! تراکنش: {Date.now()}</p>;

  return (
    <div>
      <h2>جمع کل: {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)} تومان</h2>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "در حال پرداخت..." : "پرداخت و ثبت سفارش"}
      </button>
    </div>
  );
}
