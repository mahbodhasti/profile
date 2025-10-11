"use client";
import React, { useState } from "react";
import styles from "./Product.module.css";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  rating: number;
  description?: string;
  option?: string;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, rating, description, option, onAddToCart }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div 
      className={styles.card} 
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
      onClick={() => setShowDescription(prev => !prev)}
    >
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
        {showDescription && description && (
          <div className={styles.overlay}>
            <p>{description}</p>
          </div>
        )}
      </div>
      <div className={styles.info}>
        <h3>{title}</h3>
        <div className={styles.meta}>
          <span className={styles.price}>{price}</span>
          <span>⭐ {rating}</span>
        </div>
        {option && <span className={styles.option}>گزینه: {option}</span>}
        {onAddToCart && (
          <button className={styles.addBtn} onClick={onAddToCart}>ثبت خرید</button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
