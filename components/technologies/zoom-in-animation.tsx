"use client";

import { allTech } from "@/constants";
import type { ScaleValues } from "@/types";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const SlideOutText = ({ scrollY }: { scrollY: MotionValue<number> }) => {
  const translateX = useTransform(scrollY, [0, 1], ["0%", "-10%"]);
  const translateY = useTransform(scrollY, [0, 1], ["0%", "-300%"]);
  const scale = useTransform(scrollY, [0, 1], [1, 2]);

  return (
    <motion.p
      className="title m-4 md:m-10 lg:mt-[2.5vw]"
      style={{
        translateY,
        translateX,
        scale,
      }}
    >
      I use Modern <br />
      <mark className="mark">web technologies</mark>
    </motion.p>
  );
};

const TechImages = ({ scrollY }: { scrollY: MotionValue<number> }) => {
  const scaleValues: ScaleValues = {
    scale2: useTransform(scrollY, [0, 1], [0.2, 2]),
    scale4: useTransform(scrollY, [0, 1], [0.15, 4]),
    scale5: useTransform(scrollY, [0, 1], [0.1, 5]),
    scale7: useTransform(scrollY, [0, 1], [0.07, 7]),
    scale8: useTransform(scrollY, [0, 1], [0.06, 8]),
    scale9: useTransform(scrollY, [0, 1], [0.05, 9]),
  };

  const opacity = useTransform(scrollY, [0, 0.025], [0, 1]);

  return allTech(scaleValues).map((tech, index) => (
    <motion.div
      className="w-[200%] md:w-full h-full absolute top-0 -left-1/2 md:left-0"
      key={tech.imgSrc}
      style={{ scale: tech.scale, opacity }}
    >
      <div className={`relative tech-container__${index + 1}`}>
        <Image
          src={tech.imgSrc}
          alt={tech.label}
          width={25}
          height={25}
          className="object-cover w-auto h-full"
        />
      </div>
    </motion.div>
  ));
};

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
    <div
      ref={container}
      className="h-[500vh] relative shadow-[0_10px_0_#fff] z-[1]"
      id="zoom-in-animation"
    >
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
