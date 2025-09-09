"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../Blog.module.css";

const newsData = [
  { id: 1, title: "تکنولوژی وطبیعت", image: "https://res.cloudinary.com/dhff7ulyr/image/upload/v1733127265/samples/landscapes/nature-mountains.jpg", date: "2025-08-29", summary: "ارتباط مستقیم باور نکردنی انسان و طبیعت وتکنولوژی", content: "انسان همواره در تعامل مستقیم با طبیعت بوده است؛ از هوای پاک و آب زلال گرفته تا آرامش جنگل و صدای پرندگان، هر جزئی از طبیعت روی جسم و روح انسان تأثیر می‌گذارد. همزمان، تکنولوژی نیز بخشی از زندگی اوست؛ گوشی‌ها، اینترنت، و ابزارهای هوشمند باعث می‌شوند انسان بتواند با دنیای پیرامونش ارتباط برقرار کند و از فرصت‌های نوین بهره ببرد. این پیوند سه‌جانبه—انسان، طبیعت و تکنولوژی—مسیر زندگی مدرن را شکل می‌دهد و به او امکان می‌دهد تعادلی میان آرامش طبیعی و سرعت پیشرفت فناوری ایجاد کند." },

];

export default function NewsDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const news = newsData.find(n => n.id === parseInt(id));

  if(!news) return <div className={styles.container}><p>خبر یافت نشد!</p></div>

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>← برگشت به خانه</Link>
      <h1 className={styles.title}>{news.title}</h1>
      <p className={styles.date}>{news.date}</p>
      <img src={news.image} alt={news.title} style={{width:"100%", borderRadius:"8px", marginBottom:"20px"}}/>
      <p>{news.content}</p>
    </div>
  );
}
