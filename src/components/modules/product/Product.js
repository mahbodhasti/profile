import Link from "next/link";
import styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";

const Card = ({ image, title, price, rating }) => {
  return (
    <div className={styles.card}>
      {/* کانتینر تصویر و دکمه/آیکون‌ها */}
      <div className={styles.details_container}>
        <img src={image} alt={title} />
        <div className={styles.icons}>
          <Link href="/">
            <CiSearch />
            <p className={styles.tooltip}>مشاهده سریع</p>
          </Link>
          <div>
            <CiHeart />
            <p className={styles.tooltip}>افزودن به علاقه مندی ها</p>
          </div>
        </div>
        <button>افزودن به سبد خرید</button>
      </div>

      {/* جزئیات کارت */}
      <div className={styles.details}>
        <Link href={"/"}>{title}</Link>
        <div>
          {Array.from({ length: 5 }, (_, i) =>
            i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
          )}
        </div>
        <span>{price}</span>
      </div>
    </div>
  );
};

export default Card;
