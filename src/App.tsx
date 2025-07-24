import gsap from "gsap";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import { ScrollSmoother, ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Message from "./sections/Message";
import Flavor from "./sections/Flavor";
import MouseTracker from "./components/MourseTracker";
import Nutrition from "./sections/Nutrition";
import BenefitSection from "./sections/BenefitSection";
import TestimonialSection from "./sections/TestimonialSection";
import Footer from "./sections/Footer";
import Loader from "./components/Loader";
import useStore from "./store";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(SplitText, ScrollTrigger, ScrollSmoother);

function App() {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const setLoadingDone = useStore((state) => state.setPageLoaded);
  const pageLoaded = useStore((state) => state.pageLoaded);

  useEffect(() => {
    if (!pageLoaded) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
  }, [pageLoaded]);

  useGSAP(() => {
    if (pageLoaded) {
      const smoother = ScrollSmoother.create({
        wrapper: "#root",
        content: "#smooth-wrapper",
        smooth: 2,
        effects: true,
        normalizeScroll: true,
      });
      smoother.scrollTo(0, true);
    }
  }, [pageLoaded]);
  return (
    <>
      <Navbar />
      <Loader onComplete={() => setLoadingDone()} />
      <main id={`${"smooth-wrapper"}`}>
        {!isMobile && <MouseTracker />}
        <Hero />
        <Message />
        <Flavor />
        <Nutrition />
        <BenefitSection />
        <TestimonialSection />
        <Footer />
      </main>
    </>
  );
}

export default App;
