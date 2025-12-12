"use client";
import { useState } from "react";
import axios from "axios";
import styles from "./productCard.module.css";

interface ProductCardProps {
  _id: string;
  title: string;
  price?: number;
  image?: string;
  rating?: number;
  userId: string;
  onCartUpdate?: () => void;
}

export default function ProductCard({
  _id,
  title,
  price = 0,
  image,
  rating = 0,
  userId,
  onCartUpdate,
}: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    try {
      await axios.post("/api/cart", {
        userId,
        product: { productId: _id, title, price, image, quantity: 1 },
      });
      setAdded(true);
      onCartUpdate?.();
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.hex}>
        <img
          src={image || "/fallback-product.png"}
          alt={title}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>{price.toLocaleString()} تومان</p>
        <p className={styles.rating}>{"⭐".repeat(rating)}</p>
        <button
          className={`${styles.button} ${added ? styles.added : ""}`}
          onClick={handleAdd}
          disabled={added}
        >
          {added ? "✅ اضافه شد" : "افزودن به سبد خرید"}
        </button>
      </div>
    </div>
  );
}
