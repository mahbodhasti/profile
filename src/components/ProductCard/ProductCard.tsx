"use client";
import React from "react";
import styles from "./ProductCard.module.css";

interface Props {
  _id: string;
  title: string;
  image: string;
  alt?: string;
  price: string;
  priceNumber?: number;
  rating?: number;
  description?: string;
  onAddToCart?: () => void;
}

export default function ProductCard({ title, image, alt, price, onAddToCart }: Props) {
  return (
    <article className={styles.card}>
      <img src={image} alt={alt || title} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.row}>
          <span className={styles.price}>{price} تومان</span>
          {onAddToCart && <button className={styles.buyBtn} onClick={onAddToCart}>افزودن</button>}
        </div>
      </div>
    </article>
  );
}
