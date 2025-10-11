<<<<<<< HEAD
=======
"use client";
>>>>>>> fcb3719 (Add current project files)
import styles from "./footer.module.css";
import { MdOutlineCopyright } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Article from "./Article";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <main className="container">
<<<<<<< HEAD
        {/* بخش توضیحات */}
        <section className={styles.descriptions}>
          <img src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1756405118/mahbodlg_qljvds.png" alt="لوگو مهبد هستی" />
          <p className={styles.descriptions_title}>
            مهبد هستی توسعه دهنده Full Stack
          </p>

          <div className={styles.description}>
            <FaRegHeart style={{ fontSize: "2rem" }} />
=======
        {/* توضیحات */}
        <section className={styles.descriptions}>
          <img src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1756405118/mahbodlg_qljvds.png" alt="لوگو مهبد هستی" />
          <p className={styles.descriptions_title}>
            مهبد هستی - توسعه دهنده Full Stack
          </p>

          <div className={styles.description}>
            <FaRegHeart className={styles.icon} />
>>>>>>> fcb3719 (Add current project files)
            <p>lord of programmer not place its everywhere</p>
          </div>

          <div className={styles.description}>
<<<<<<< HEAD
            <FaRegHeart />
            <p>پیگیری سفارشات : mahbod.hasti@live.com</p>
          </div>

          <div className={styles.description}>
            <FaRegHeart />
=======
            <FaRegHeart className={styles.icon} />
            <p>پیگیری سفارشات: mahbod.hasti@live.com</p>
          </div>

          <div className={styles.description}>
            <FaRegHeart className={styles.icon} />
>>>>>>> fcb3719 (Add current project files)
            <p>M</p>
          </div>
        </section>

<<<<<<< HEAD
        {/* بخش مقالات */}
        <section>
          <h4>جدیدترین نوشته ها</h4>
          <Article
            href="https://res.cloudinary.com/dhff7ulyr/image/upload/v1733127264/samples/people/bicycle.jpg"
            date="۱۷ آبان ۱۴۰۴"
            comments="بدون دیدگاه"
            img="/images/sample.jpg"
            title="بالون"
          />
          <hr />
=======
        {/* جدیدترین نوشته‌ها */}
        <section className={styles.latestArticles}>
          <h4>جدیدترین نوشته‌ها</h4>
          <div className={styles.articlesWrapper}>
            <Article
              href="https://res.cloudinary.com/dhff7ulyr/image/upload/v1733127264/samples/people/bicycle.jpg"
              date="۱۷ آبان ۱۴۰۴"
              comments="بدون دیدگاه"
              img="/images/sample.jpg"
              title="بالون"
            />
            {/* می‌توانید چند Article دیگر هم اضافه کنید */}
          </div>
>>>>>>> fcb3719 (Add current project files)
        </section>

        {/* لینک‌ها */}
        <ul className={styles.links}>
          <div>
            <h4>منوی فوتر</h4>
<<<<<<< HEAD
            <li>
              <Link href="/contact-us">تماس با ما</Link>
            </li>
            <li>
              <Link href="/about-us">درباره ما</Link>
            </li>
            <li>
              <Link href="/rules">قوانین</Link>
            </li>
          </div>
          <div>
            <h4>دسترسی سریع</h4>
            <li>
              <Link href="/category">فروشگاه</Link>
            </li>
            <li>
              <Link href="/articles">مقالات</Link>
            </li>
            <li>
              <Link href="/cart">سبد خرید</Link>
            </li>
            <li>
              <Link href="/wishlist">علاقه‌مندی‌ها</Link>
            </li>
=======
            <li><Link href="/contact-us">تماس با ما</Link></li>
            <li><Link href="/about-us">درباره ما</Link></li>
            <li><Link href="/rules">قوانین</Link></li>
          </div>
          <div>
            <h4>دسترسی سریع</h4>
            <li><Link href="/category">فروشگاه</Link></li>
            <li><Link href="/articles">مقالات</Link></li>
            <li><Link href="/cart">سبد خرید</Link></li>
            <li><Link href="/wishlist">علاقه‌مندی‌ها</Link></li>
>>>>>>> fcb3719 (Add current project files)
          </div>
        </ul>

        {/* لایسنس‌ها */}
        <div className={styles.licenses}>
<<<<<<< HEAD
          
          <img src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1756558004/license1_e5gbsd.png" width={85} height={85} alt="لایسنس ۱" />
         
=======
          <img src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1756558004/license1_e5gbsd.png" width={85} height={85} alt="لایسنس ۱" />
>>>>>>> fcb3719 (Add current project files)
          <img src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1756558018/license3_z4uemz.png" width={62} height={95} alt="لایسنس ۲" />
        </div>
      </main>

      <hr />

<<<<<<< HEAD
      {/* بخش کپی‌رایت */}
      <div className="container">
        <p className={styles.copyRight}>
          2025 تمام حقوق متعلق است به مهبد هستی M{" "}
          <strong></strong> | طراحی و اجرا{" "}
          <strong>lord of programmer</strong>{" "}
=======
      {/* کپی‌رایت */}
      <div className="container">
        <p className={styles.copyRight}>
          2025 تمام حقوق متعلق است به مهبد هستی M | طراحی و اجرا 
          <strong> lord of programmer </strong> 
>>>>>>> fcb3719 (Add current project files)
          <MdOutlineCopyright />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
