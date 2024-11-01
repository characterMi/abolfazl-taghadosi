"use client";

import { arrowSvg } from "@/constants";
import { useInView, useScroll } from "framer-motion";
import { useRef } from "react";
import RevealAnimation from "../shared/reveal-animation";
import { SectionsWithAnimation, SectionsWithoutAnimation } from "./sections";

const ArrowSvg = () => {
  const arrow = useRef(null);

  const { scrollYProgress } = useScroll({
    target: arrow,
    offset: ["start 0.9", "start center"],
  });

  return (
    <svg
      ref={arrow}
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="4rem"
      height="12rem"
      viewBox="-620 350 350.000000 150.000000"
      preserveAspectRatio="xMidYMid meet"
      className="inline"
      style={{
        transform: "rotateX(180deg)",
      }}
      aria-hidden
    >
      <g
        transform="translate(0.000000,900.000000) scale(0.100000,-0.100000) rotate(90)"
        className="fill-dark-blue"
        stroke="none"
      >
        {arrowSvg.map((d, i) => {
          const start = i / arrowSvg.length;
          const end = start + 1 / arrowSvg.length;

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
  );
};

const About = () => {
  const container = useRef(null);
  const isInView = useInView(container, { once: true });

  return (
    <section
      id="about"
      className="bg-white px-4 md:px-10 lg:px-[2.5vw] pb-96 lg:pb-[30vw] z-[1] relative"
      ref={container}
    >
      <SectionsWithAnimation isSectionInView={isInView} />

      <SectionsWithoutAnimation isSectionInView={isInView} />

      <p className="text-neutral-900 text-lg xss:text-xl sm:text-3xl lg:text-[2vw] !leading-tight font-normal inline align-top">
        Well, that was it! Want to see what I&apos;ve been working on? Scroll
        down a bit and Checkout the projects below to explore some of the work
        I&apos;ve done along the way.
      </p>

      <ArrowSvg />
    </section>
  );
};

export default About;
