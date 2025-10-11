"use client";
import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_content}>
        {/* لوگو */}
        <div className={styles.logo_container} onClick={handleLogoClick}>
          <img
            src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1756405118/mahbodlg_qljvds.png"
            alt="Logo"
          />
        </div>

        {/* منو */}
        <ul className={`${styles.menu} ${menuOpen ? styles.menu_visible : ""}`}>
          {/* صفحات عمومی */}
          <li><Link href="/">خانه</Link></li>
          <li><Link href="/latest">محصولات</Link></li>
          <li><Link href="/contact-us">تماس با ما</Link></li>
          <li><Link href="/about-us">درباره ما</Link></li>
          <li><Link href="/blog">وبلاگ</Link></li>
          <li><Link href="/chat">چت عمومی</Link></li>

          {/* صفحات کاربری */}
          <li><Link href="/signup">ثبت نام</Link></li>
          <li><Link href="/login">ورود</Link></li>

          {/* 💳 بخش فروشگاه */}
          <li><Link href="/checkout">پرداخت</Link></li>
          <li><Link href="/dashboard">پنل کاربری</Link></li>

          {/* 🧩 فقط برای مدیر */}
          <li><Link href="/admin">ادمین</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
