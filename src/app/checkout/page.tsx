"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/orders", {
        userId: email,
        email,
        phone,
        transactionId,
      });

      if (res.status === 201) {
        router.push(`/user/${email}`);
      }
    } catch (err) {
      alert("خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.card}>
        <h2 className={styles.title}>فرم ثبت سفارش</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="شماره تلفن"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="کد تراکنش"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "در حال ارسال..." : "ثبت سفارش"}
          </button>
        </form>
      </div>
    </div>
  );
}
