import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const counterRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const obj = { value: 0 };

    gsap.to(obj, {
      value: 100,
      duration: 8,
      ease: "power4.Out",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = `${Math.round(obj.value)}%`;
        }
      },
      onComplete: () => {
        if (loaderRef.current) {
          gsap.to(loaderRef.current, {
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              onComplete();
            },
          });
        } else {
          onComplete();
        }
      },
    });
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        transition: "clip-path 0.5s ease-in-out",
      }}
      className="fixed top-0 left-0 w-screen h-screen inset-0 z-[2500] bg-dark-brown flex items-center justify-center text-white text-6xl font-bold loader"
    >
      <div className="md:absolute right-10 bottom-10 counter" ref={counterRef}>
        0%
      </div>
    </div>
  );
};

export default Loader;
