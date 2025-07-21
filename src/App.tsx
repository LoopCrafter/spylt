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

gsap.registerPlugin(SplitText, ScrollTrigger, ScrollSmoother);

function App() {
  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: "#root",
      content: "#smooth-wrapper",
      smooth: 2,
      effects: true,
      normalizeScroll: true,
    });
  }, []);
  return (
    <main id="smooth-wrapper">
      <MouseTracker />
      <Navbar />
      <Hero />
      <Message />
      <Flavor />
      <Nutrition />
      <BenefitSection />
      <TestimonialSection />
      <div className="h-screen bg-red-400 z-50 relative" />
    </main>
  );
}

export default App;
