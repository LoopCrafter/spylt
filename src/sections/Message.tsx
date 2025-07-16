import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const Message = () => {
  useGSAP(() => {
    const splitTitle = SplitText.create(".first-message", {
      type: "words",
    });
    const splitTitle2 = SplitText.create(".second-message", {
      type: "words",
    });
    const paragraphSplit = SplitText.create(".message-content p", {
      type: "lines",
      //   linesClass: "paragraph-line",
      mask: "lines",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".message-content",
        scrub: true,
        start: "top center",
        end: "bottom bottom",
      },
    });
    tl.from(splitTitle.words, {
      opacity: 0.4,
      stagger: 1,
      ease: "power1.Out",
    })
      .to(".msg-text-scroll", {
        duration: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "circ.inOut",
      })
      .from(splitTitle2.words, {
        opacity: 0.4,
        stagger: 1,
        ease: "power1.in",
      })
      .from(paragraphSplit.lines, {
        yPercent: 300,
        rotate: 10,
        ease: "power1.inOut",
        duration: 1,
        stagger: 0.5,
        delay: 1,
      });
  }, []);
  return (
    <section className="message-content">
      <div className="container mx-auto flex-center py-28 relative">
        <div className="w-full h-full">
          <div className="msg-wrapper">
            <h1 className="first-message">Stir up your fearless past and</h1>

            <div
              style={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
              }}
              className="msg-text-scroll"
            >
              <div className="bg-light-brown md:pb-5 pb-3 px-5">
                <h2 className="text-red-brown">Fuel Up</h2>
              </div>
            </div>

            <h1 className="second-message">
              your future with every gulp of Perfect Protein
            </h1>
          </div>

          <div className="flex-center md:mt-20 mt-10">
            <div className="max-w-lg flex justify-center">
              <p>
                Rev up your rebel spirit and feed the adventure of <br /> life
                with SPYLT, where you’re one chug away from epic <br />{" "}
                nostalgia and fearless fun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Message;
