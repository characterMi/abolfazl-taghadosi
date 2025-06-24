"use client";

import { aboutContent } from "@/constants";
import { useScroll } from "framer-motion";
import { Fragment, useRef } from "react";
import SlideUpAnimation from "../shared/slide-up-animation";
import { ArrowSvg } from "./arrow-svg";
import { SectionHeading } from "./heading";
import { RevealText } from "./reveal-text";

const About = () => {
  const container = useRef(null);

  const { scrollYProgress: headingScrollProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  const { scrollYProgress: textScrollProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "end 0.1"],
  });

  const { scrollYProgress: placeholderScrollProgress } = useScroll({
    target: container,
    offset: ["start 1.1", "end 0.3"],
  });

  return (
    <section
      id="about"
      className="bg-white px-4 md:px-10 lg:px-[2.5vw] pb-96 lg:pb-[30vw] z-[1] relative"
    >
      <SlideUpAnimation
        whileInView="animate"
        type="single-word"
        childClassName="text-neutral-900 leading-[0.85]"
        containerClassName="text-4xl smart-watch:text-5xl xss:text-7xl sm:text-8xl lg:text-[6vw] font-black uppercase mb-6 sm:mb-10 lg:mb-[2.5vw]"
      >
        Who I Am?
      </SlideUpAnimation>

      <div
        className="my-6 sm:my-12 lg:my-[3vw] space-y-6 lg:space-y-[2.5vw]"
        ref={container}
      >
        {aboutContent.map(({ title, content }, i) => {
          const start = i / aboutContent.length;
          const end = start + 1 / aboutContent.length;

          return (
            <Fragment key={title}>
              <SectionHeading
                title={title}
                range={[start, end]}
                scrollProgress={headingScrollProgress}
              />

              <RevealText
                texts={content.split("_")}
                textScrollProgress={textScrollProgress}
                placeholderScrollProgress={placeholderScrollProgress}
                range={[start, end]}
              />
            </Fragment>
          );
        })}
      </div>

      <div className="text-lg xss:text-xl sm:text-3xl lg:text-[2vw] !leading-tight font-normal">
        <p className="text-neutral-900 inline align-top mr-1 sm:mr-2 lg:mr-[0.5vw]">
          And that&apos;s it! Curious to see what I&apos;ve been up to? Scroll
          down and check out the projects below to explore some of the work
          I&apos;ve created along
          <span className="sr-only">the way</span>
        </p>

        <div className="inline-flex" aria-hidden>
          <p className="text-neutral-900">the way.</p>
          <ArrowSvg />
        </div>
      </div>
    </section>
  );
};

export default About;
