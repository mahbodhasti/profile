"use client";

import Aos from "aos";
import React, { useEffect } from "react";
import "aos/dist/aos.css";

function AOSInit() {
  useEffect(() => {
    Aos.init({
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 1000, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    });
  }, []);

  return null;
}

export default AOSInit;
