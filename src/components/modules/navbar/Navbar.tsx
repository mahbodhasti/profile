"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "./Nabvar.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";

export default function Navbar() {
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleNavbar = () => setActive(prev => !prev);

  // --- بستن Dropdown با کلیک بیرون ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`${styles.navbar} ${active ? styles.active : ""}`}>
      <div className={styles.logo} onClick={toggleNavbar}>
        <img
          src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1756405118/mahbodlg_qljvds.png"
          alt="Logo"
        />
      </div>

      <ul className={styles.links}>
        <li><Link href="/about-us">درباره ما</Link></li>
        <li><Link href="/contact-us">تماس با ما</Link></li>

        {!session ? (
          <>
            <li><Link href="/login">ورود</Link></li>
            <li><Link href="/signup">ثبت‌نام</Link></li>
          </>
        ) : (
          <li className={styles.dropdown}>
  <span onClick={() => setOpenDropdown(prev => !prev)}>
    {session.user?.email}
    <IoIosArrowDown
      className={`${styles.dropdown_icon} ${openDropdown ? styles.rotate : ""}`}
    />
  </span>

  <div
    ref={dropdownRef}
    className={`${styles.dropdown_content} ${openDropdown ? styles.show : ""}`}
  >
    <Link href="/MyOrder">سفارش‌های من</Link>
    <button onClick={() => signOut()}>خروج</button>
  </div>
</li>

        )}
      </ul>

      <div className={styles.icons}>
        <Link href="/cart"><FaShoppingCart /></Link>
        <Link href="/wishlist"><FaRegHeart /></Link>
      </div>
    </nav>
  );
}
