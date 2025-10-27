"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./checkoutForm.module.css";

export default function CheckoutForm({ userId }: { userId: string }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("/api/orders", {
        userId,
        email,
        phone,
        status: "pending",
      });

      setStatus("success");

      // ✅ هدایت کاربر به صفحه‌ی مخصوص خودش
      router.push(`/user/${userId}`);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>اطلاعات پرداخت</h3>

      <input
        type="email"
        placeholder="ایمیل"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="tel"
        placeholder="شماره تماس"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <button type="submit">ثبت سفارش</button>

      {status === "success" && <p>در حال انتقال به صفحه سفارش شما...</p>}
      {status === "error" && <p>خطا در ثبت سفارش، دوباره تلاش کنید</p>}
    </form>
  );
}
