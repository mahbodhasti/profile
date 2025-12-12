'use client';
import Link from "next/link";
import Image from "next/image";
import styles from "./promote.module.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Promote = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <main className={styles.readable}>
      <div className={styles.container}>
        {/* بخش اول: معرفی و باشگاه مشتریان */}
        <section data-aos="fade-up-right" className={styles.mainSection}>
          <div className={styles.textContent}>
            <span>طراحی متفاوت</span>
            <p>فردایی متفاوت، ما برای حرکت درست شدیم؛ فردایی زیباتر.</p>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1759823222/dolphin_oyvboz.jpg"
              alt="car"
              width={300}
              height={300}
            />
          </div>

          <div className={styles.club}>
            <div>
              <span>باشگاه مشتریان</span>
              <p>برای مشتریان وفادار</p>
            </div>
          </div>
        </section>

        {/* بخش دوم: چرا قهوه ست */}
        <section data-aos="fade-up" className={styles.mainSection}>
          <div className={styles.imageWrapper}>
            <Image
              src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1756488177/mahbod_gyzk0d.jpg"
              alt="mahbod"
              width={150}
              height={150}
            />
          </div>

          <div className={styles.whyCoffee}>
            <Image
              className={styles.logo}
              src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1756405118/mahbodlg_qljvds.png"
              alt="مهبد"
              width={100}
              height={100}
            />
            <p className={styles.title}>mahbod hasti</p>
            <p className={styles.description}></p>
            <div className={styles.buttons}>
              <Link href="/about-us">
                <button className={styles.redBtn}>بیشتر بخوانید</button>
              </Link>
              <Link href="/category">
                <button className={styles.btn}>فروشگاه</button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Promote;
