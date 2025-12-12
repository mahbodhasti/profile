import Link from "next/link";
import styles from "./ContactUs.module.css";
import { CiHeart, CiMail, CiPhone } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";

export default function ContactUsPage() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        ← برگشت به خانه
      </Link>
      <section className={styles.profile}>
        <div className={styles.image}>
          <img 
            src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1756488177/mahbod_gyzk0d.jpg" 
            alt="Profile" 
          />
        </div>
        <div className={styles.text}>
          <h1>تماس با ما</h1>
          <p>
            اگر سوالی دارید یا می‌خواهید با ما همکاری کنید، می‌توانید از طریق اطلاعات زیر با ما در ارتباط باشید.
          </p>
          <div className={styles.contact}>
            <div>
              <CiMail /> mahbod.hasti@gmail.com
            </div>
            <div>
              <CiPhone /> +98 912 557 1069
            </div>
            <div>
              <BsWhatsapp /> +98 912 557 1069
            </div>
          </div>
          <div className={styles.socials}>
            <a href="https://github.com/mahbodhasti" target="_blank">
              <FaGithub /> GitHub
            </a>
            <a href="https://wa.me/989125571069" target="_blank">
              <BsWhatsapp /> WhatsApp
            </a>
            
          </div>
        </div>
      </section>
    </div>
  );
}
