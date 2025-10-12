"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSInit = ({ children}: { children: React.ReactNode }) => {
   useEffect(() => {
    AOS.init({
      once: true, // Chỉ animate 1 lần
      duration: 800, // Thời gian hiệu ứng (ms)
    });
  }, []);

  return <>{children}</>;
};

export default AOSInit;
