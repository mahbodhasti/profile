"use client";

import Link from "next/link";
import styles from "./category.module.css";
import { useEffect, useState } from "react";
import { FaChevronRight, FaCartPlus } from "react-icons/fa";
import Card from "../../components/modules/product/Product";

interface ProductType {
  _id: string;
  title: string;
  image: string;
  price: string;
  rating: number;
}

interface CartItem extends ProductType {
  quantity: number;
}

const CategoryPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // دریافت محصولات از API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data: ProductType[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // بارگذاری سبد خرید از localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // ذخیره سبد خرید
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductType) => {
    setCart(prev => {
      const exist = prev.find(item => item._id === product._id);
      if (exist) {
        return prev.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (_id: string) => {
    setCart(prev => prev.filter(item => item._id !== _id));
  };

  const updateQuantity = (_id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev =>
      prev.map(item => (item._id === _id ? { ...item, quantity } : item))
    );
  };

  const totalPrice = cart.reduce((sum, item) => {
    const priceNumber = parseInt(item.price.replace(/,/g, "").replace(" تومان", ""));
    return sum + priceNumber * item.quantity;
  }, 0);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backBtn}>
          <FaChevronRight /> بازگشت به صفحه اصلی
        </Link>
        <h1>همه محصولات</h1>
      </header>

      <main className={styles.main}>
        {/* محصولات */}
        <section className={styles.products}>
          {products.map(product => (
            <div key={product._id} className={styles.productWrapper}>
              <Card
                image={product.image}
                title={product.title}
                price={product.price}
                rating={product.rating}
              />
              <button className={styles.addCartBtn} onClick={() => addToCart(product)}>
                <FaCartPlus /> ثبت خرید
              </button>
            </div>
          ))}
        </section>

        {/* سبد خرید */}
        <aside className={styles.cart}>
          <h2>سبد خرید</h2>
          {cart.length === 0 && <p>سبد خرید خالی است</p>}
          {cart.map(item => (
            <div key={item._id} className={styles.cartItem}>
              <p>{item.title}</p>
              <p>{item.price} x {item.quantity}</p>
              <div className={styles.cartControls}>
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                <button onClick={() => removeFromCart(item._id)}>حذف</button>
              </div>
            </div>
          ))}
          {cart.length > 0 && <p className={styles.total}>جمع کل: {totalPrice.toLocaleString()} تومان</p>}
        </aside>
      </main>
    </div>
  );
};

export default CategoryPage;
