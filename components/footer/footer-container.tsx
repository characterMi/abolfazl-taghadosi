"use client";

import { footerArrowSvg } from "@/constants";
import { useReduceMotion } from "@/hooks/use-reduce-motion";
import TornPaper from "@/public/images/torn-paper.svg";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import RevealAnimation from "../shared/reveal-animation";

const Curve = ({
  height,
  svgArrowAnimation,
  shouldReduceMotion,
}: {
  height: MotionValue<string>;
  svgArrowAnimation: MotionValue<number>;
  shouldReduceMotion: boolean;
}) => {
  return (
    <div
      className="absolute w-full top-0 left-0 z-10 pointer-events-none"
      aria-hidden
    >
      {shouldReduceMotion && (
        <Image
          src={TornPaper}
          alt=""
          aria-hidden
          className="absolute top-0 left-0 w-full object-cover pointer-events-none shadow-[0_10px_0_#fff] rotate-180"
        />
      )}

      <div className="absolute -top-60 left-1/2 -translate-x-1/2 rotate-45 min-[1768px]:hidden min-[1768px]:invisible">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="9.5rem"
          height="9.5rem"
          viewBox="0 0 128.000000 128.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)"
            className="fill-dark-blue"
            fill="#32a2c7"
            stroke="none"
          >
            {footerArrowSvg.map((d, i) => {
              const start = i / footerArrowSvg.length;
              const end = start + 1 / footerArrowSvg.length;

              return (
                <RevealAnimation
                  d={d}
                  range={[start, end]}
                  progress={svgArrowAnimation}
                  key={d}
                />
              );
            })}
          </g>
        </svg>
      </div>

      <div className="w-full h-screen overflow-hidden flex flex-col items-center">
        <motion.div
          className="w-[110vw] rounded-b-[100%] bg-white shadow-[0_0_50px_#171717]"
          style={{ height: shouldReduceMotion ? 0 : height }}
        />
      </div>
    </div>
  );
};

export const FooterContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const shouldReduceMotion = useReduceMotion();

  const footer = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: footer,
    offset: ["start end", "start start"],
  });

  const { scrollYProgress: svgArrowAnimation } = useScroll({
    target: footer,
    offset: ["start end", "start center"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["50vh", "0vh"]);

  return (
    <footer
      className="bg-gradient-to-r h-full from-neutral-950 to-neutral-900 relative z-[1]"
      ref={footer}
      id="contact"
    >
      <Curve
        height={height}
        svgArrowAnimation={svgArrowAnimation}
        shouldReduceMotion={shouldReduceMotion}
      />
      <div
        className={twMerge(
          "overflow-hidden h-screen min-h-max flex flex-col py-6 px-4 sm:p-10 lg:p-[2.5vw]",
          shouldReduceMotion && "md:pt-[12vw] lg:pt-[10vw]"
        )}
      >
        {children}
      </div>
    </footer>
  );
};
