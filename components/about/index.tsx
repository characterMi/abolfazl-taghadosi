"use client";

import { aboutContent, aboutSectionArrowIcon, legends } from "@/constants";
import { fadeIn } from "@/utils/motion";
import { motion, useInView, useScroll } from "framer-motion";
import { useRef } from "react";
import RevealAnimation from "../shared/reveal-animation";
import SlideUpAnimation from "../shared/slide-up-animation";
import SlideUpLink from "../shared/slide-up-link";

const About = () => {
  const ref = useRef(null);
  const arrow = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { scrollYProgress } = useScroll({
    target: arrow,
    offset: ["start 0.9", "start center"],
  });

  return (
    <section
      id="about"
      className="bg-white px-4 md:px-10 lg:px-[2.5vw] pb-96 lg:pb-[30vw]"
      ref={ref}
    >
      <SlideUpAnimation
        animate={isInView ? "animate" : ""}
        text={"Who I Am?"}
        type="single-word"
        childClassName="text-neutral-900 leading-[0.85]"
        containerClassName="text-4xl smart-watch:text-5xl xss:text-7xl sm:text-8xl lg:text-[6vw] font-black uppercase mb-6 sm:mb-10 lg:mb-[2.5vw]"
      />

      <motion.div
        variants={fadeIn}
        initial="initial"
        animate={isInView ? "animate" : ""}
        exit="initial"
      >
        {aboutContent.map((item) => (
          <div key={item.title} className="mt-6 sm:mt-12 lg:mt-[3vw]">
            <p className="text-neutral-900 text-2xl xss:text-3xl sm:text-5xl lg:text-[3vw] leading-tight font-semibold mb-6 lg:mb-[1.5vw]">
              - {item.title}
            </p>

            <p className="text-neutral-900 text-lg xss:text-xl sm:text-3xl lg:text-[2vw] !leading-tight font-thin px-4 lg:px-[1vw]">
              {item.content}
            </p>
          </div>
        ))}

        <div className="my-12 lg:my-[3vw]">
          <p className="text-neutral-900 text-2xl xss:text-3xl sm:text-5xl lg:text-[3vw] leading-tight font-semibold mb-6 lg:mb-[1.5vw]">
            - Inspirations and Mentors
          </p>

          <div className="text-neutral-900 text-lg xss:text-xl sm:text-3xl lg:text-[2vw] !leading-tight font-thin p-4 lg:p-[1vw]">
            Throughout my learning journey, there have been several individuals
            who have had a profound impact on my growth as a developer. Their
            teaching, guidance, and content have inspired me and shaped my
            approach to coding. I owe much of my progress to
            {legends.map((legend, index) => (
              <div key={legend.name} className="inline text-neutral-900">
                {index === 0 && " "}
                {index === legends.length - 1 && "and "}
                <SlideUpLink
                  title={legend.name}
                  link={legend.link}
                  childClassName="dark-mark"
                  containerClassName="font-bold"
                  isBlank
                />
                {index !== legends.length - 1 && ", "}
              </div>
            ))}
            . Each of them has played a key role in helping me push my
            boundaries and explore new horizons in web development.
          </div>
        </div>

        <p className="text-neutral-900 text-lg xss:text-xl sm:text-3xl lg:text-[2vw] !leading-tight font-normal inline align-top">
          Well, that was it! Want to see what I&apos;ve been working on? Scroll
          down a bit and Checkout the projects below to explore some of the work
          I&apos;ve done along the way.
        </p>

        <svg
          ref={arrow}
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="12rem"
          height="12rem"
          viewBox="-200 380 1100.000000 900.000000"
          preserveAspectRatio="xMidYMid meet"
          className="inline"
          style={{
            transform: "rotateZ(100deg) rotateX(180deg)",
          }}
        >
          <g
            transform="translate(0.000000,900.000000) scale(0.100000,-0.100000)"
            className="fill-dark-blue"
            stroke="none"
          >
            {aboutSectionArrowIcon.map((d, i) => {
              const start = i / aboutSectionArrowIcon.length;
              const end = start + 1 / aboutSectionArrowIcon.length;

              return (
                <RevealAnimation
                  d={d}
                  range={[start, end]}
                  progress={scrollYProgress}
                  key={d}
                />
              );
            })}
          </g>
        </svg>
      </motion.div>
    </section>
  );
};

export default About;
