"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const MouseTracker = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const smallCursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cursorRef.current || !smallCursorRef.current) return;

    if (cursorRef.current) {
      gsap.set(cursorRef.current, { scale: 1, opacity: 1 });
    }

    const xToBig = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.2,
      ease: "power3.out",
    });

    const yToBig = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.2,
      ease: "power3.out",
    });

    const xToSmall = gsap.quickTo(smallCursorRef.current, "x", {
      duration: 0.6,
      ease: "power3.out",
    });

    const yToSmall = gsap.quickTo(smallCursorRef.current, "y", {
      duration: 0.6,
      ease: "power3.out",
    });

    const moveHandler = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      const target = e.target as HTMLElement;

      const isInteractive = target.closest("a, button, .hover");

      if (isInteractive) {
        gsap.to(cursorRef.current, {
          scale: 0,
          duration: 0.2,
        });

        gsap.to(smallCursorRef.current, {
          scale: 0,
          duration: 0.2,
        });
      } else {
        gsap.to(cursorRef.current, {
          scale: 1,
          duration: 0.2,
        });

        gsap.to(smallCursorRef.current, {
          scale: 1,
          duration: 0.2,
        });
      }

      xToBig(x - 20);
      yToBig(y - 20);

      xToSmall(x - 8);
      yToSmall(y - 8);
    };

    document.addEventListener("mousemove", moveHandler);

    return () => {
      document.removeEventListener("mousemove", moveHandler);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor max-sm:hidden size-8 rounded-full fixed top-0 left-0 border border-[#523122] z-50 pointer-events-none"
      />
      <div
        ref={smallCursorRef}
        className="max-sm:hidden fixed top-0 left-0 size-2 rounded-full  z-[55] bg-[#523122] pointer-events-none"
      />
    </>
  );
};

export default MouseTracker;
