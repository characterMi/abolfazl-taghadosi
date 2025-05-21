"use client";

import { heroSectionTitle } from "@/constants";
import { gVariants, screenVariant } from "@/utils/motion";
import { motion } from "framer-motion";

const HeroAnimation = () => {
  return (
    <motion.div
      aria-hidden
      className="absolute top-0 left-0 z-10 w-full h-full overflow-hidden"
      initial={{ display: "block" }}
      animate={{ display: "none", transition: { delay: 4.2 } }}
    >
      <motion.div
        className="bg-gradient-to-t from-dark-blue to-primary w-[200%] md:w-[150%] rounded-b-[50%] absolute top-0 left-1/2 -translate-x-1/2 overflow-hidden"
        variants={screenVariant}
        initial="initial"
        animate="animate"
      >
        <div className="w-screen h-full mx-auto p-4 md:p-10 xl:p-[3vw] flex items-start">
          {heroSectionTitle.map((letter, i) => {
            return (
              <svg
                width="100%"
                viewBox={letter.svgViewBox}
                xmlns="http://www.w3.org/2000/svg"
                key={letter.id}
                style={{
                  transform: i % 2 ? "translateY(100%)" : "translateY(0%)",
                }}
              >
                <motion.g
                  id={letter.id}
                  strokeLinecap="round"
                  fillRule="evenodd"
                  fontSize="9pt"
                  stroke="black"
                  fill="black"
                  className="stroke-black fill-black translate-y-[150%]"
                  variants={gVariants}
                  initial="initial"
                  animate="animate"
                  custom={
                    i % 2 ? (i + heroSectionTitle.length) * 0.05 : i * 0.05
                  }
                >
                  <path d={letter.d} vectorEffect="non-scaling-stroke" />
                </motion.g>
              </svg>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroAnimation;
