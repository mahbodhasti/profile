"use client";
import React, { useEffect, useState } from "react";

type OrderType = {
  _id: string;
  userEmail: string;
  phone: string;
  transactionId: string;
  totalPrice: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  items?: any[];
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Error fetching orders");
      setOrders(data);
    } catch (err: any) {
      console.error("fetchOrders error:", err);
      setError(err.message || "خطا در دریافت سفارش‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAction = async (id: string, action: "approve" | "reject" | "delete") => {
    if (action === "delete") {
      if (!confirm("آیا مطمئن هستید که می‌خواهید این سفارش را حذف کنید؟")) return;
    }

    try {
      const method = action === "delete" ? "DELETE" : "PUT";
      const body = action === "delete" ? undefined : JSON.stringify({ action });
      const res = await fetch(`/api/admin/orders/${id}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });
      const dataText = await res.text();
      let data;
      try { data = JSON.parse(dataText); } catch { data = { raw: dataText }; }

      if (!res.ok) {
        console.error("admin action error:", data);
        alert(data?.message || "عملیات ناموفق بود");
        return;
      }

      // بروزرسانی محلی state به جای فراخوانی مجدد کامل
      if (action === "delete") {
        setOrders((prev) => prev.filter((o) => o._id !== id));
      } else {
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...(o as any), status: action === "approve" ? "approved" : "rejected" } : o))
        );
      }
    } catch (err: any) {
      console.error("handleAction error:", err);
      alert("خطا در انجام عملیات");
    }
  };

  return (
    <div style={{ padding: 20, direction: "rtl" }}>
      <h1 style={{ marginBottom: 20 }}>مدیریت سفارش‌ها</h1>

      {loading && <p>در حال بارگذاری...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !orders.length && <p>سفارشی موجود نیست.</p>}

      {orders.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f3f3f3" }}>
                <th style={thStyle}>ایمیل</th>
                <th style={thStyle}>تلفن</th>
                <th style={thStyle}>تراکنش</th>
                <th style={thStyle}>جمع کل</th>
                <th style={thStyle}>وضعیت</th>
                <th style={thStyle}>تاریخ</th>
                <th style={thStyle}>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={tdStyle}>{order.userEmail}</td>
                  <td style={tdStyle}>{order.phone}</td>
                  <td style={tdStyle}>{order.transactionId}</td>
                  <td style={tdStyle}>{order.totalPrice.toLocaleString()}</td>
                  <td style={tdStyle}>
                    <span style={{ color: order.status === "pending" ? "orange" : order.status === "approved" ? "green" : "red", fontWeight: 600 }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={tdStyle}>{new Date(order.createdAt).toLocaleString()}</td>
                  <td style={tdStyle}>
                    {order.status === "pending" && (
                      <>
                        <button style={greenBtn} onClick={() => handleAction(order._id, "approve")}>✅ تأیید</button>
                        <button style={redBtn} onClick={() => handleAction(order._id, "reject")}>❌ رد</button>
                      </>
                    )}
                    <button style={delBtn} onClick={() => handleAction(order._id, "delete")}>🗑 حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const thStyle: React.CSSProperties = { padding: 10, textAlign: "center" };
const tdStyle: React.CSSProperties = { padding: 10, textAlign: "center" };
const greenBtn: React.CSSProperties = { background: "#22c55e", color: "#fff", border: "none", padding: "6px 8px", borderRadius: 6, marginRight: 6, cursor: "pointer" };
const redBtn: React.CSSProperties = { background: "#ef4444", color: "#fff", border: "none", padding: "6px 8px", borderRadius: 6, marginRight: 6, cursor: "pointer" };
const delBtn: React.CSSProperties = { background: "#777", color: "#fff", border: "none", padding: "6px 8px", borderRadius: 6, cursor: "pointer" };
