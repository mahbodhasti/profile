"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./latest.module.css";
import StickyCart from "../../../StickyCart/StickyCart";
import ProductCard from "../../../modules/ProductCard/ProductCard";

interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
}

export default function Latest() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        if (Array.isArray(res.data)) {
          const fixedProducts = res.data.map((p) => ({
            _id: p._id,
            title: p.title || "بدون عنوان",
            // تبدیل string به number و حذف مقادیر نال/خالی
            price: p.price ? parseFloat(p.price) : 0,
            image:
              p.image ||
              "https://res.cloudinary.com/dhff7ulyr/image/upload/v1733127264/samples/ecommerce/car-interior-design.jpg",
          }));
          setProducts(fixedProducts);
        }
      } catch (err) {
        console.error("خطا در دریافت محصولات:", err);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <p className={styles.farsi}>آخرین محصولات</p>
        <span className={styles.english}>Latest Products</span>
      </section>

      <main className={styles.products}>
        {products.length === 0 ? (
          <p className={styles.loading}>در حال بارگذاری...</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))
        )}
      </main>

      <StickyCart />
    </div>
  );
}
