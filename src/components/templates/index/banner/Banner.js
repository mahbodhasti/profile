"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

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
      className="mySwiper home-slider"
    >
      <SwiperSlide>
        <img
          src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1733562688/kjkgagebshif7vciiusc.jpg"
          alt="Slide"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1733720788/nxmmgtyxspf2918fhvpu.jpg"
          alt="Slide"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://res.cloudinary.com/dhff7ulyr/image/upload/v1733562366/jbaglvbhq8ieyk9tsevk.jpg"
          alt="Slide"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default Banner;
