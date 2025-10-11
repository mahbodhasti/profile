"use client";
import React from "react";
<<<<<<< HEAD
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./banner.modul.css"

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
=======
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./banner.modul.css";

import "swiper/css";
import "swiper/css/navigation";
>>>>>>> fcb3719 (Add current project files)
import { Navigation, Autoplay } from "swiper/modules";

function Banner() {
  return (
    <Swiper
      rewind={true}
      navigation={true}
      loop={true}
<<<<<<< HEAD
      autoplay={{ delay: 1500 }}
      modules={[Navigation, Autoplay]}
      className="mySwiper home-slider swiper-scrollbar-drag"
    >
      <SwiperSlide>
        <img
          src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1733127264/samples/landscapes/beach-boat.jpg"
          alt="Slide"
          className={`style.slideImg `}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1733127264/samples/animals/three-dogs.jpg"
          alt="Slide"
          className={style.slideImg}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1733127262/samples/animals/reindeer.jpg"
          alt="Slide"
          className={style.slideImg }
=======
      autoplay={{ delay: 2000 }}
      modules={[Navigation, Autoplay]}
      className={styles.swiper}
    >
      <SwiperSlide className={styles.swiperSlide}>
        <img
          src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1733127264/samples/landscapes/beach-boat.jpg"
          alt="Slide"
          className={styles.slideImg}
        />
      </SwiperSlide>
      <SwiperSlide className={styles.swiperSlide}>
        <img
          src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1733127264/samples/animals/three-dogs.jpg"
          alt="Slide"
          className={styles.slideImg}
        />
      </SwiperSlide>
      <SwiperSlide className={styles.swiperSlide}>
        <img
          src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1733127262/samples/animals/reindeer.jpg"
          alt="Slide"
          className={styles.slideImg}
>>>>>>> fcb3719 (Add current project files)
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default Banner;
