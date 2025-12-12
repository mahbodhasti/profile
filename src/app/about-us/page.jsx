"use client"; // برای استفاده از کامپوننت‌های آیکون و لینک‌ها در Client
import Link from "next/link";
import styles from "./AboutUs.module.css";
import { CiHeart, CiMail, CiPhone } from "react-icons/ci";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function AboutMePage() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        ← برگشت به خانه
      </Link>

      <section className={styles.profile}>
        <div className={styles.image}>
          <img src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1756488177/mahbod_gyzk0d.jpg" alt="Profile" />
        </div>

        <div className={styles.text}>
          <h1>سلام، من مهبد هستم</h1>
          <p>
            من یک برنامه‌نویس وب هستم که عاشق ساختن رابط‌های کاربری زیبا و کاربردی با React و Next.js هستم.
            این یک نمونه صفحه درباره من است و هدفش نمایش مهارت‌ها و اطلاعات تماس من است.
          </p>

          <div className={styles.contact}>
            <div>
              <CiMail className={styles.icon} /> mahbod.hasti@gmail.com
            </div>
            <div>
              <CiPhone className={styles.icon} /> +98 912 557 1069
            </div>
          </div>

          <div className={styles.socials}>
            <a href="https://github.com/mahbodhasti" target="_blank" rel="noreferrer">
              <FaGithub className={styles.icon} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/mahbodhasti" target="_blank" rel="noreferrer">
              <FaLinkedin className={styles.icon} /> LinkedIn
            </a>
            <a href="https://www.instagram.com/lord_of_programmer" target="_blank" rel="noreferrer">
              <CiHeart className={styles.icon} /> Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
