"use client";

import { heroSectionTitle } from "@/constants";
import { ease, gVariants } from "@/utils/motion";
import { motion } from "framer-motion";

export const HeroTitle = () => (
  <div className="flex w-full mix-blend-difference z-[11] relative" aria-hidden>
    {heroSectionTitle.map((letter, i) => {
      if (i % 2) {
        return (
          <motion.svg
            width="100%"
            viewBox={letter.svgViewBox}
            xmlns="http://www.w3.org/2000/svg"
            variants={{
              initial: {
                translateY: "100%",
              },
              animate: {
                translateY: "0%",
                transition: {
                  delay: 3.3,
                  duration: 0.6,
                  type: "tween",
                  ease,
                },
              },
            }}
            initial="initial"
            animate="animate"
            key={letter.id}
          >
            <motion.g
              id={letter.id}
              strokeLinecap="round"
              fillRule="evenodd"
              fontSize="9pt"
              stroke="#56ccf2"
              fill="#56ccf2"
              className="stroke-primary fill-primary translate-y-[150%]"
              variants={gVariants}
              initial="initial"
              animate="animate"
              custom={(i + heroSectionTitle.length) * 0.05}
            >
              <path d={letter.d} vectorEffect="non-scaling-stroke" />
            </motion.g>
          </motion.svg>
        );
      } else {
        return (
          <svg
            width="100%"
            className=""
            viewBox={letter.svgViewBox}
            xmlns="http://www.w3.org/2000/svg"
            key={letter.id}
          >
            <motion.g
              id={letter.id}
              strokeLinecap="round"
              fillRule="evenodd"
              fontSize="9pt"
              stroke="#56ccf2"
              fill="#56ccf2"
              className="stroke-primary fill-primary translate-y-[150%]"
              variants={gVariants}
              initial="initial"
              animate="animate"
              custom={i * 0.05}
            >
              <path d={letter.d} vectorEffect="non-scaling-stroke" />
            </motion.g>
          </svg>
        );
      }
    })}
  </div>
);
