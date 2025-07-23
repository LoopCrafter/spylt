import gsap from "gsap";
import { useEffect, useRef } from "react";
import { links } from "../constants";
type Props = {
  isOpen: boolean;
};

const Drawer: React.FC<Props> = ({ isOpen }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;

    gsap.killTweensOf(el);

    if (isOpen) {
      el.style.visibility = "visible";
      el.style.pointerEvents = "auto";

      gsap.to(".drawer", {
        clipPath: "polygon(0 0%, 100% 0, 100% 100%, 0 100%)",
        ease: "power3.inOut",
        duration: 2,
      });
    } else {
      gsap.to(".drawer", {
        clipPath: "polygon(0 0%, 100% 0, 100% 0%, 0 0%)",
        ease: "power3.inOut",
        duration: 1,
        onComplete: () => {
          el.style.visibility = "hidden";
          el.style.pointerEvents = "none";
        },
      });
    }
  }, [isOpen]);

  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const imageSrc =
      e.currentTarget.getAttribute("data-image") || "images/m0.webp";

    if (!imageSrc || !imageRef.current) return;
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1 },
      {
        opacity: 1,
        scale: 1.05,
        duration: 0.6,
        ease: "power4.inOut",
        onStart: () => {
          imageRef.current!.src = imageSrc;
        },
      }
    );
  };
  const handleLeave = () => {
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1 },
      {
        opacity: 1,
        scale: 1.05,
        duration: 0.6,
        ease: "power4.inOut",
        onStart: () => {
          imageRef.current!.src = "images/m0.webp";
        },
      }
    );
  };

  return (
    <div
      className="drawer"
      ref={drawerRef}
      style={{
        clipPath: "polygon(0 0%, 100% 0, 100% 0%, 0 0%)",
      }}
    >
      <div className="hidden">
        {links.map((link, index) => (
          <img src={`images/${link.image}`} key={index} />
        ))}
      </div>
      <div className="flex">
        <div className="w-1/2 h-screen">
          <div className="group flex flex-col  text-center justify-center items-center h-full">
            {links.map((item, index) => (
              <a
                key={index}
                className="drawer-link w-full"
                data-image={`images/${item.image}`}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="w-1/2 h-screen relative overflow-hidden">
          <img
            ref={imageRef}
            className="absolute inset-0 w-full h-full object-cover z-10"
            src="images/m0.webp"
            alt="hover preview"
          />
        </div>
      </div>
    </div>
  );
};

export default Drawer;
