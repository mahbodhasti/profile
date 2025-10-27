"use client";
import Image from "next/image";
import styles from "./ProductCard.module.css";
import { addToCart } from "../../../../lib/localStorageCart";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, title, price, image }: ProductCardProps) {
  const handleAdd = () => {
    addToCart({ id, title, price: Number(price), image, quantity: 1 });
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className={styles.card}>
      <Image src={image} alt={title} width={300} height={200} className={styles.image} />
      <div className={styles.info}>
        <h3>{title}</h3>
        <p className={styles.price}>{Number(price).toLocaleString("fa-IR")} تومان</p>
      </div>
      <button className={styles.addBtn} onClick={handleAdd}>
        افزودن به سبد خرید
      </button>
    </div>
  );
}
