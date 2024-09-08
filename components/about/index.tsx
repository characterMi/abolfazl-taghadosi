"use client";

import { aboutSectionArrowIcon } from "@/constants";
import {
  motion,
  MotionValue,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { SectionsWithAnimation, SectionsWithoutAnimation } from "./sections";

type Props = {
  d: string;
  range: number[];
  progress: MotionValue<number>;
};

const Path = ({ d, progress, range }: Props) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return <motion.path d={d} opacity={opacity} />;
};

const About = () => {
  const arrow = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { scrollYProgress } = useScroll({
    target: arrow,
    offset: ["start 0.9", "start center"],
  });

  return (
    <section
      id="about"
      className="bg-white px-4 md:px-10 lg:px-[2.5vw] pb-96 lg:pb-[30vw] z-[1] relative"
      ref={ref}
    >
      <SectionsWithAnimation isSectionInView={isInView} />

      <SectionsWithoutAnimation isSectionInView={isInView} />

      <p className="text-neutral-900 text-lg xss:text-xl sm:text-3xl lg:text-[2vw] !leading-tight font-normal inline align-top">
        Well, that was it! Want to see what I&apos;ve been working on? Scroll
        down a bit and Checkout the projects below to explore some of the work
        I&apos;ve done along the way.
      </p>

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
      >
        <g
          transform="translate(0.000000,900.000000) scale(0.100000,-0.100000) rotate(90)"
          className="fill-dark-blue"
          stroke="none"
        >
          {aboutSectionArrowIcon.map((d, i) => {
            const start = i / aboutSectionArrowIcon.length;
            const end = start + 1 / aboutSectionArrowIcon.length;

            return (
              <Path
                d={d}
                range={[start, end]}
                progress={scrollYProgress}
                key={d}
              />
            );
          })}
        </g>
      </svg>
    </section>
  );
};

export default About;
