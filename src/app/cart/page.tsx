"use client";
import { useEffect, useState } from "react";

interface CartItem {
  _id: string;
  title: string;
  price: string;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const sum = cart.reduce((acc, item) => {
      const priceNumber = parseInt(item.price.replace(/,/g, "").replace(" تومان", ""));
      return acc + priceNumber * item.quantity;
    }, 0);
    setTotal(sum);
  }, [cart]);

  const handleOnlinePay = async () => {
    const res = await fetch("/api/payment/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });
    const data = await res.json();
    if (data.payment_url) window.location.href = data.payment_url;
    else alert("خطا در پرداخت آنلاین");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>سبد خرید شما</h2>
      {cart.map(item => (
        <div key={item._id} style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
          <span>{item.title} x {item.quantity}</span>
          <span>{item.price}</span>
        </div>
      ))}
      <hr />
      <h3>جمع کل: {total.toLocaleString()} تومان</h3>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button onClick={handleOnlinePay} style={{ padding: "10px 20px", background: "#0070f3", color: "white", borderRadius: "5px" }}>
          پرداخت آنلاین (زرین‌پال)
        </button>

        <button onClick={() => alert("شماره کارت: 3036-1183-8618-6219\nبه نام: مهبد هستی\nمبلغ: " + total.toLocaleString())} 
          style={{ padding: "10px 20px", background: "#114639", color: "white", borderRadius: "5px" }}>
          کارت به کارت
        </button>
      </div>
    </div>
  );
}
