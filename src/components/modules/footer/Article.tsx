import Link from "next/link";
import styles from "./article.module.css";

interface ArticleProps {
  title: string;
  img: string;
  comments: number;
  date: string;
  href: string;
}

const Article: React.FC<ArticleProps> = ({
  title,
  img,
  comments,
  date,
  href = "#", // پیش‌فرض
}) => {
  return (
    <Link href={href} className={styles.article}>
      <img src={img} alt={title} />
      <div>
        <p className={styles.title}>{title}</p>
        <div className={styles.meta}>
          <p>{comments} دیدگاه</p>
          <p dir="rtl">{date}</p>
        </div>
      </div>
    </Link>
  );
};

export default Article;
