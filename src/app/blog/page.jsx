"use client";

import Link from "next/link";
import styles from "./Blog.module.css";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

// داده‌های نمونه خبرها
const newsData = [
  { id: 1, title: "تکنولوژی و طبیعت", image: "https://res.cloudinary.com/dhff7ulyr/image/upload/v1733127265/samples/landscapes/landscape-panorama.jpg", date: "2025-08-29", summary: "نسخه جدید React امکانات زیادی دارد.", category: "تکنولوژی" },
  { id: 2, title: "Next.js 15 عرضه شد", image: "/images/news2.jpg", date: "2025-08-28", summary: "Next.js بهینه‌سازی‌های زیادی ارائه می‌دهد.", category: "تکنولوژی" },
  { id: 3, title: "Tailwind CSS برای UI", image: "/images/news3.jpg", date: "2025-08-27", summary: "طراحی رابط کاربری سریع و ریسپانسیو.", category: "طراحی" },
  { id: 4, title: "Node.js آپدیت شد", image: "/images/news4.jpg", date: "2025-08-26", summary: "Node.js با بهبود امنیت و عملکرد عرضه شد.", category: "تکنولوژی" },
  { id: 5, title: "CSS Grid پیشرفته", image: "/images/news5.jpg", date: "2025-08-25", summary: "یادگیری Grid CSS برای طراحی صفحات پیچیده ضروری است.", category: "طراحی" },
  { id: 6, title: "JavaScript ES2025", image: "/images/news6.jpg", date: "2025-08-24", summary: "ویژگی‌های جدید JS در سال 2025.", category: "تکنولوژی" },
];

// Pagination
const ITEMS_PER_PAGE = 3;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(newsData.length / ITEMS_PER_PAGE);
  const displayedNews = newsData.slice((currentPage-1)*ITEMS_PER_PAGE, currentPage*ITEMS_PER_PAGE);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>← برگشت به خانه</Link>
      <h1 className={styles.title}>وبلاگ خبری ما</h1>

      <div className={styles.newsGrid}>
        {displayedNews.map(news => (
          <div key={news.id} className={styles.card}>
            <div className={styles.details_container}>
              <img src={news.image} alt={news.title}/>
              <div className={styles.icons}><CiSearch /></div>
              <Link href={`/blog/${news.id}`}>
                <button>مشاهده خبر</button>
              </Link>
            </div>
            <div className={styles.details}>
              <h2>{news.title}</h2>
              <p className={styles.date}>{news.date}</p>
              <p>{news.summary}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button onClick={() => setCurrentPage(prev => Math.max(prev-1, 1))}>قبلی</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev+1, totalPages))}>بعدی</button>
      </div>
    </div>
  );
}
