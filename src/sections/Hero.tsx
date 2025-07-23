import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Loader from "../components/Loader";

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isReady = loadingDone && videoLoaded;

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  useGSAP(
    () => {
      if (!isReady) return;
      const splitTitle = SplitText.create(".hero-title", {
        type: "chars",
        mask: "chars",
      });
      const tl = gsap.timeline({ delay: 1 });
      tl.to(".hero-text-scroll", {
        duration: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "circ.out",
        delay: 0.2,
      });

      tl.from(
        splitTitle.chars,
        {
          yPercent: 200,
          opacity: 0,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.5"
      )
        .from(
          ".hero-content h2",
          {
            yPercent: 100,
            opacity: 0,
            ease: "power2.out",
          },
          "<"
        )

        .from(
          ".hero-button",
          {
            yPercent: 100,
            opacity: 0,
            ease: "power2.out",
          },
          "<"
        );

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          scrub: true,
          start: "1% top",
          end: "bottom top",
        },
      });
      heroTl.to(".hero-section", {
        rotate: 7,
        scale: 0.9,
        yPercent: 30,
        opacity: 0.6,
        ease: "power1.inOut",
      });
    },
    { dependencies: [videoLoaded, isReady] }
  );

  useEffect(() => {
    if (loadingDone && videoLoaded && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Video play failed:", err);
      });
    }
  }, [loadingDone, videoLoaded]);

  const handleVideoReady = () => {
    setVideoLoaded(true);
  };

  return (
    <>
      <Loader onComplete={() => setLoadingDone(true)} />
      <section className="bg-main-bg hero-section overflow-hidden">
        <div className="hero-container">
          {isTablet ? (
            <>
              {isMobile && (
                <img
                  src="/images/hero-bg.png"
                  className="absolute bottom-40 size-full object-cover"
                />
              )}
              <img
                src="/images/hero-img.png"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 object-auto"
              />
            </>
          ) : (
            <video
              src="/videos/hero-bg.mp4"
              ref={videoRef}
              muted
              playsInline
              onCanPlayThrough={handleVideoReady}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="hero-content">
            <div className="overflow-hidden">
              <h1 className="hero-title">Freaking Delicious</h1>
            </div>
            <div
              style={{
                clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
              }}
              className="hero-text-scroll"
            >
              <div className="hero-subtitle">
                <h1>Protein + Caffine </h1>
              </div>
            </div>
            <h2>
              Live life to the fullest  with SPYLT: Shatter boredom and embrace
              your inner kid with every deliciously smooth chug.
            </h2>
            <div className="hero-button">
              <p>Chug a SPYLT</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
