import Link from "next/link";
import styles from "./latest.module.css";
import { FaChevronLeft } from "react-icons/fa6";
import Card from './../../../modules/product/Product';

const Latest = () => {
  const products = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dhff7ulyr/image/upload/v1756488130/lordloss_xxjmbj.jpg",
      title: "lordloss",
      price: "825,000 تومان",
      rating: 3,
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dhff7ulyr/image/upload/v1756488126/crypsly_jr3u2y.jpg",
      title: "larten",
      price: "750,000 تومان",
      rating: 4,
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dhff7ulyr/image/upload/v1756488243/mathias_elced2.jpg",
      title: "walk",
      price: "900,000 تومان",
      rating: 5,
    },
    {
      id: 4,
      image: "https://res.cloudinary.com/dhff7ulyr/image/upload/v1756488244/leron_vgbcou.jpg",
      title: "city",
      price: "700,000 تومان",
      rating: 4,
    },

  ];

  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <div>
          <p>آخرین محصولات</p>
          <span>Latest products</span>
        </div>
        <Link className={styles.link} href={"/category"}>
          مشاهده همه <FaChevronLeft />{" "}
        </Link>
      </section>

      <main data-aos="zoom-in-right" className={styles.products}>
        {products.map((product) => (
          <Card
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </main>
    </div>
  );
};

export default Latest;
