"use client";
import React, { useEffect, useState } from "react";
import styles from  "./Nabvar.module.css";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";

interface User {
  email: string;
  orders: { id: number; status: string; items: any[] }[];
}

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 105);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // فرضی: بعد از ثبت نام یا ورود، اطلاعات کاربر fetch شود
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <nav className={`${styles.navbar} ${isSticky ? styles.navbar_fixed : ""}`}>
      <main className={styles.navbar_content}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/">
            <img src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1756405118/mahbodlg_qljvds.png" alt="Logo" />
          </Link>
        </div>

        {/* Links */}
        <ul className={styles.links}>
          <li><Link href="/contact-us">تماس با ما</Link></li>
          <li><Link href="/about-us">درباره ما</Link></li>
          {!user && (
            <>
              <li><Link href="/signup">ثبت نام</Link></li>
              <li><Link href="/login">ورود</Link></li>
            </>
          )}

          {user && (
            <li className={styles.dropdown}>
              <span>
                {user.email} <IoIosArrowDown className={styles.dropdown_icon} />
              </span>
              <div className={styles.dropdown_content}>
                <Link href="/p-user/orders">سفارشات</Link>
                <Link href="/chat/private">چت خصوصی</Link>
              </div>
            </li>
          )}
          <li><Link href="/blog">وبلاگ</Link></li>
        </ul>

        {/* Icons */}
        <div className={styles.navbar_icons}>
          <Link href="/cart">
            <FaShoppingCart />
          </Link>
          <Link href="/wishlist">
            <FaRegHeart />
          </Link>
        </div>
      </main>
    </nav>
  );
}

export default Navbar;
