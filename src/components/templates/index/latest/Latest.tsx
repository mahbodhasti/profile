// مسیر: src/app/latest/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./latest.module.css";

interface ProductType {
  _id: string;
  title: string;
  image: string;
  alt: string;
  price: string;
  rating: number;
  description: string;
  option: string;
}

interface CartItem extends ProductType {
  quantity: number;
}

export default function Latest() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then(r => r.json())
      .then(data => setProducts(data))
      .catch(console.error);

    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);

  const parsePrice = (priceStr: string) => parseInt(priceStr.replace(/[^0-9]/g, "")) || 0;
  const total = cart.reduce((sum, it) => sum + parsePrice(it.price) * it.quantity, 0);

  const addToCart = (p: ProductType) => {
    setCart(prev => {
      const existing = prev.find(x => x._id === p._id);
      if (existing) return prev.map(i => i._id === p._id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...p, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i._id !== id));

  const handlePaymentCard = async () => {
    if (!cart.length) return alert("سبد خرید خالی است");
    if (!paymentId.trim()) return alert("شناسه پرداخت را وارد کنید");
    if (!email.trim()) return alert("لطفاً ایمیل خود را وارد کنید");

    const orderData = {
      items: cart.map(c => ({ productId: c._id, title: c.title, price: c.price, quantity: c.quantity })),
      totalPrice: total,
      paymentId,
      status: "pending",
      userEmail: email,
      userPhone: phone || null,
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const result = await res.json();
    if (result.success) {
      setCart([]);
      setShowCart(false);
      setPaymentId("");
      setEmail("");
      setPhone("");
      localStorage.removeItem("cart");
      router.push(`/orders/status?userEmail=${encodeURIComponent(orderData.userEmail)}`);
    } else alert("❌ خطا در ثبت سفارش، لطفاً دوباره تلاش کنید.");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🛍️ آخرین محصولات</h2>
      <div className={styles.grid}>
        {products.map(p => (
          <div key={p._id} className={styles.cardWrapper} onMouseEnter={() => setHoveredId(p._id)} onMouseLeave={() => setHoveredId(null)}>
            <img src={p.image} alt={p.alt} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <h3>{p.title}</h3>
              <p>{p.price}</p>
              {hoveredId === p._id && (
                <div className={styles.actions}>
                  <button onClick={() => addToCart(p)}>افزودن به سبد خرید</button>
                  {cart.find(c => c._id === p._id) && <button onClick={() => removeFromCart(p._id)}>حذف از سبد</button>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className={styles.stickyCart}>
          🛒 {cart.length} محصول — جمع کل: {total.toLocaleString()} تومان
          <button onClick={() => setShowCart(true)}>مشاهده سبد خرید</button>
        </div>
      )}

      {showCart && (
        <div className={styles.cartModal}>
          <div className={styles.cartContent}>
            <h3>سبد خرید شما</h3>
            {cart.map(item => <div key={item._id}>{item.title} × {item.quantity}</div>)}
            <div>جمع کل: {total.toLocaleString()} تومان</div>

            <input
              type="email"
              placeholder="ایمیل (الزامی)"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="شماره تماس (اختیاری)"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="شناسه پرداخت..."
              value={paymentId}
              onChange={e => setPaymentId(e.target.value)}
            />
            <button onClick={handlePaymentCard}>ثبت پرداخت</button>
            <button onClick={() => setShowCart(false)}>بستن</button>
          </div>
        </div>
      )}
    </div>
  );
}
