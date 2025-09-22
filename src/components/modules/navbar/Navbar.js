"use client";
import React, { useEffect, useState } from "react";
import styles from "./Nabvar.module.css";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";

function Navbar() {
  // state درست با نام صحیح
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY; // اسکرول فعلی
      setIsSticky(currentScroll > 105); // تغییر وضعیت چسبندگی
    };

    window.addEventListener("scroll", handleScroll);

    // پاک کردن event listener هنگام خروج
    return () => window.removeEventListener("scroll", handleScroll);
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
          <li>  <Link href="/signup">ثبت نام</Link></li>
          <li>  <Link href="/login">ورود</Link></li>
          <li>  <Link href="/login">ثبت انلاین</Link></li>
              <li><Link href="chat">چت عمومی</Link></li>
          

          {/* Dropdown */}
          <li className={styles.dropdown}>
            <Link href="/p-user">
              حساب کاربری <IoIosArrowDown className={styles.dropdown_icon} />
            </Link>
            <div className={styles.dropdown_content}>
              {/* <Link href="/p-user/orders">سفارشات</Link> */}
          <li><Link href="/blog">وبلاگ</Link></li>
              {/* <Link href="/p-user/wishlist">علاقه‌مندی‌ها</Link> */}
              {/* <Link href="/p-user/account-details">جزئیات اکانت</Link> */}
            </div>
          </li>
        </ul>

        {/* Icons */}
        {/* <div className={styles.navbar_icons}>
          <Link href="/cart">
            <FaShoppingCart />
            <span>1</span>
          </Link>
          <Link href="/wishlist">
            <FaRegHeart />
            <span>1</span>
          </Link>
        </div> */}
      </main>
    </nav>
  );
}

export default Navbar;
