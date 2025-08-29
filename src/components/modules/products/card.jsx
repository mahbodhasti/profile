"use client";
import Link from "next/link";
import styles from "./product.module.css";
import { FaStar, FaRegStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";

const Card = ({ image, title, price, rating }) => {
  return (
    <div className={styles.card}>
      <div className={styles.details_container}>
        <img src={image} alt={title} />
        <div className={styles.icons}>
          <Link href="/">
            <CiSearch />
            <p className={styles.tooltip}>مشاهده سریع</p>
          </Link>
          <div>
            <CiHeart />
            <p className={styles.tooltip}>افزودن به علاقه‌مندی‌ها</p>
          </div>
        </div>
        <button className={styles.addToCartButton}>افزودن به سبد خرید</button>
      </div>
      <div className={styles.details}>
        <Link href="/">{title}</Link>
        <div className={styles.rating}>
          {Array.from({ length: 5 }).map((_, i) =>
            i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
          )}
        </div>
        <span>{price}</span>
      </div>
    </div>
  );
};

export default Card;
