"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css"; // 👈 اضافه شد
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/post");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Frontend error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className={styles.page}>
      <Link className={styles.button} href="/">خانه</Link>
      <div
        className={styles.card}
        style={{ maxWidth: 400, margin: "0 auto", padding: 20 }} // 👈 حفظ شد
      >
        <h1 className={styles.title}>وارد شوید</h1>

        <form className={styles.form} onSubmit={handleLogin}>
          <input
            className={styles.input}
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: "block", marginBottom: 10, width: "100%", padding: 8 }} // 👈 حفظ شد
          />

          <input
            className={styles.input}
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: "block", marginBottom: 10, width: "100%", padding: 8 }} // 👈 حفظ شد
          />

          <button
            className={styles.button}
            type="submit"
            style={{ padding: 10, width: "100%" }} // 👈 حفظ شد
          >
            ورود
          </button>
          
        </form>

        {error && (
          <p className={styles.error} style={{ marginTop: 10 }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
