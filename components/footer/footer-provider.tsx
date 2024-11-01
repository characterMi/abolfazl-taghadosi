"use client";

import { footerArrowSvg } from "@/constants";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import RevealAnimation from "../shared/reveal-animation";

const Curve = ({
  height,
  svgArrowAnimation,
}: {
  height: MotionValue<string>;
  svgArrowAnimation: MotionValue<number>;
}) => {
  return (
    <div
      className="absolute w-full top-0 left-0 z-10 pointer-events-none"
      aria-hidden
    >
      <div className="absolute -top-60 left-1/2 -translate-x-1/2 rotate-45 min-[1768px]:hidden">
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
          style={{ height }}
        />
      </div>
    </div>
  );
};

export const FooterProvider = ({ children }: { children: React.ReactNode }) => {
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
      className="min-h-[52rem] md:min-h-[28rem] h-screen bg-gradient-to-r from-neutral-950 to-neutral-900 py-6 px-4 sm:p-10 lg:p-[2.5vw] relative z-[1] flex flex-col"
      ref={footer}
      id="contact"
    >
      <Curve height={height} svgArrowAnimation={svgArrowAnimation} />
      {children}
    </footer>
  );
};
