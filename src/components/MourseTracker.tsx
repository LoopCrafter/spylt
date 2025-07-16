"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const MouseTracker = () => {
  useGSAP(() => {
    document.addEventListener("mousemove", mouseTracker);

    return () => {
      document.removeEventListener("mousemove", mouseTracker);
    };
  });

  const mouseTracker = (e: MouseEvent) => {
    const cursor = document.querySelector(".cursor");
    const cursorWrapper = document.querySelector(".cursor-wrapper");
    const x = e.clientX + window.scrollX;
    const y = e.clientY + window.scrollY;
    gsap.to(cursor, {
      x: x - 20,
      y: y - 20,
      duration: 0.7,
      ease: "power4.out",
      delay: 0.15,
    });

    gsap.to(cursorWrapper, {
      x: x - 30,
      y: y - 30,
      duration: 0.7,
      ease: "power4.out",
      delay: 0.3,
    });
  };

  return (
    <>
      <div className="cursor w-[10px] h-[10px] rounded-full fixed top-0 left-0 bg-[#523122] z-50"></div>
      <div className="cursor-wrapper w-[30px] h-[30px] rounded-full fixed top-0 left-0 border border-[#523122] z-50"></div>
    </>
  );
};

export default MouseTracker;
