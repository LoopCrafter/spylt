import { useEffect, useRef, useState } from "react";
import MagneticWrapper from "./MagneticButton";
import gsap from "gsap";
import Drawer from "./Drawer";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerRef = useRef<HTMLDivElement | null>(null);
  const topLine = useRef<HTMLDivElement | null>(null);
  const bottomLine = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      const tl = gsap.timeline();
      tl.to([topLine.current, bottomLine.current], {
        width: "1.2vw",
        ease: "power2.out",
      });
      tl.to([topLine.current], {
        y: 5,
        duration: 0.3,
        ease: "power2.inOut",
      });
      tl.to(
        [bottomLine.current],
        {
          y: -5,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
      tl.to(topLine.current, {
        rotateZ: 45,
        transformOrigin: "center center",
        duration: 0.4,
        ease: "power2.out",
      });

      tl.to(
        bottomLine.current,
        {
          rotateZ: -45,
          transformOrigin: "center center",
          duration: 0.4,
          ease: "power2.out",
        },
        "<"
      );
    } else {
      gsap.to([topLine.current, bottomLine.current], {
        width: "3vw",
        y: "0%",
        rotateZ: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
      gsap.to(hamburgerRef.current, {
        background: "#fff",
        duration: 0.4,
        ease: "power2.inOut",
        delay: 0.2,
      });
    }
  }, [isOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[2001] md:p-9 p-3 cursor-pointer flex justify-between items-center ">
        <MagneticWrapper strength={20} textStrength={10}>
          <img src="/images/nav-logo.svg" alt="Logo" className="w-24 md:w-20" />
        </MagneticWrapper>
        <MagneticWrapper strength={20} textStrength={30}>
          <div
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={toggleMenu}
            ref={hamburgerRef}
          >
            <div ref={topLine} className="hamburger-line" />
            <div ref={bottomLine} className="hamburger-line" />
          </div>
        </MagneticWrapper>
      </div>
      <Drawer isOpen={isOpen} />
    </>
  );
};

export default Navbar;
