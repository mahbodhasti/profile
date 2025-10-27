"use client";

import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import styles from "./category.module.css"
import Card from "../../components/modules/ProductCard/ProductCard";

export default function CategoryPage() {
  const products = [
    { id: 1, image: "https://res.cloudinary.com/dhff7ulyr/image/upload/v1756488130/lordloss_xxjmbj.jpg", title: "lordloss", price: "825,000 تومان", rating: 3 },
    { id: 2, image: "https://res.cloudinary.com/dhff7ulyr/image/upload/v1733127273/cld-sample.jpg", title: "larten", price: "750,000 تومان", rating: 4 },
    { id: 3, image: "https://res.cloudinary.com/dhff7ulyr/image/upload/v1733127272/samples/dessert-on-a-plate.jpg", title: "walk", price: "900,000 تومان", rating: 5 },
    { id: 4, image: "https://res.cloudinary.com/dhff7ulyr/image/upload/v1733127272/samples/coffee.jpg", title: "city", price: "700,000 تومان", rating: 4 },
  ];

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        ← برگشت به خانه
      </Link>

      <h1 className={styles.title}>فروشگاه</h1>

      <div className={styles.productsGrid}>
        {products.map(product => (
          <Card
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
}
