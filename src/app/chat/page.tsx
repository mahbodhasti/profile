"use client";

import { useEffect, useState } from "react";
import { ChatMessage } from "../../types/chat";
import styles from "./ChatMessage.module.css";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [form, setForm] = useState({ author: "", message: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/api/chat")
      .then((res) => res.json())
      .then((data: ChatMessage[]) => setMessages(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.author || !form.message) return;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      setMessages((prev) => [data.chat, ...prev]);
      setForm({ author: "", message: "" });
    }
  };

  if (!mounted) return null; // جلوگیری از Hydration Error

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>💬 Public Chat</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Your name"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Type a message..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>

      {messages.length === 0 ? (
        <p className={styles.empty}>هنوز پیامی ثبت نشده است. اولین پیام خود را ارسال کنید!</p>
      ) : (
        <div className={styles.messages}>
          {messages.map((msg) => {
            const isSelf = msg.author === form.author;
            return (
              <div
                key={msg._id}
                className={`${styles.messageItem} ${isSelf ? styles.self : styles.other}`}
              >
                <span className={styles.author}>{msg.author}:</span>
                <span className={styles.message}>{msg.message}</span>
                <span className={styles.time}>
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
