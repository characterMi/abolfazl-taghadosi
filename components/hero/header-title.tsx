"use client";

import { heroSectionTitle } from "@/constants";
import { ease, gVariants } from "@/utils/motion";
import { motion } from "framer-motion";

export const HeaderTitle = () => (
  <div className="flex w-full m-auto mix-blend-difference">
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
            key={i}
          >
            <motion.g
              id={letter.id}
              strokeLinecap="round"
              fillRule="evenodd"
              fontSize="9pt"
              stroke="#ff98a2"
              strokeWidth="0.25mm"
              fill="#ff98a2"
              className="stroke-pink stroke-[0.25mm] fill-pink"
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
            key={i}
          >
            <motion.g
              id={letter.id}
              strokeLinecap="round"
              fillRule="evenodd"
              fontSize="9pt"
              stroke="#ff98a2"
              strokeWidth="0.25mm"
              fill="#ff98a2"
              className="stroke-pink stroke-[0.25mm] fill-pink"
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