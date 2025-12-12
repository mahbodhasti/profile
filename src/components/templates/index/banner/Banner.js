"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./banner.module.css"

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";

function Banner() {
  return (
    <Swiper
      rewind={true}
      navigation={true}
      loop={true}
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
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default Banner;
