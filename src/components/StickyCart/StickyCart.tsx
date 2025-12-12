"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./StickyCart.module.css";
import { getCart, removeFromCart } from "../../../lib/localStorageCart";

export default function StickyCart() {
  const [items, setItems] = useState<any[]>([]);
  const router = useRouter();

  const updateCart = () => setItems(getCart());

  useEffect(() => {
    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  const handleRemove = (id: string) => {
    removeFromCart(id);
    updateCart();
  };

  const goToCheckout = () => router.push("/checkout");

  const total = items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);

  if (items.length === 0) return null;

  return (
    <div className={styles.stickyCart}>
      <h4>سبد خرید شما</h4>
      <div className={styles.cartList}>
        {items.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            {item.image && <img src={item.image} alt={item.title} className={styles.image} />}
            <div className={styles.info}>
              <h5>{item.title}</h5>
              <p>{item.quantity} × {Number(item.price).toLocaleString("fa-IR")} تومان</p>
            </div>
            <button className={styles.removeBtn} onClick={() => handleRemove(item.id)}>❌</button>
          </div>
        ))}
      </div>
      <div className={styles.total}>
        <span>جمع کل:</span>
        <p>{total.toLocaleString("fa-IR")} تومان</p>
      </div>
      <button className={styles.checkoutBtn} onClick={goToCheckout}>ادامه خرید</button>
    </div>
  );
}
