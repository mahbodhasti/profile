"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import styles from "./Nabvar.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";

export default function Navbar() {
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const toggleNavbar = () => setActive(prev => !prev);

  return (
    <nav className={`${styles.navbar} ${active ? styles.active : ""}`}>
      <div className={styles.logo} onClick={toggleNavbar}>
        <img src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1756405118/mahbodlg_qljvds.png" alt="Logo" />
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
            <span>
              {session.user?.email} <IoIosArrowDown className={styles.dropdown_icon} />
            </span>
            <div className={styles.dropdown_content}>
              <Link href={`/MyOrder/${session.user.id}`}>سفارش‌های من</Link>
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
