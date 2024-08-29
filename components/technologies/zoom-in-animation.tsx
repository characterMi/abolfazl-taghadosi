"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SlideOutText } from "./slideout-text";
import { TechImages } from "./tech-images";

export const ZoomInAnimation = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["circle(0% at 50% 50%)", "circle(71% at 50% 50%)"]
  );

  return (
    <div ref={container} className="h-[500vh] relative shadow-[0_10px_0_#fff]">
      <div className="sticky h-screen top-0 pt-4 md:pt-10 lg:pt-[2.5vw] overflow-hidden">
        <SlideOutText scrollY={scrollYProgress} />

        <TechImages scrollY={scrollYProgress} />

        <div className="w-full h-full absolute top-0 overflow-hidden flex justify-center items-center">
          <motion.div
            className="relative w-full h-screen bg-white"
            style={{
              clipPath,
              WebkitClipPath: clipPath,
            }}
          />
        </div>
      </div>
    </div>
  );
};
