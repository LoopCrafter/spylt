import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const VideoPinSection = () => {
  useGSAP(() => {
    gsap.to(".circle-text", {
      rotate: 360,
      transformOrigin: "center",
      repeat: -1,
      duration: 6,
      ease: "none",
    });

    gsap.fromTo(
      ".video-section",
      {
        width: 100,
        height: 100,
        borderRadius: "50%",
        transformOrigin: "center",
      },
      {}
    );
  }, []);
  return (
    <div className="flex justify-center items-center overflow-hidden">
      <div className="h-screen relative w-full bg-slate-900 video-section  text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-1/2 -translate-y-1/2 w-[150px] h-[150px]">
          <img
            src="images/circle-text.svg"
            alt="circle text"
            loading="lazy"
            className="circle-text w-full h-full"
          />
          <div className="absolute top-1/2 left-1/2 -translate-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md shadow-lg p-6 rounded-full">
            <img src="images/play.svg" alt="play icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPinSection;
