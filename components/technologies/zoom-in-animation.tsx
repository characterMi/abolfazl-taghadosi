"use client";

import { allTech } from "@/constants";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const SlideOutText = ({ scrollY }: { scrollY: MotionValue<number> }) => {
  const translateX = useTransform(scrollY, [0, 1], ["0%", "-10%"]);
  const translateY = useTransform(scrollY, [0, 1], ["0%", "-300%"]);
  const skewX = useTransform(scrollY, [0, 1], ["0deg", "50deg"]);
  const scale = useTransform(scrollY, [0, 1], [1, 2]);

  return (
    <motion.p
      className="title m-4 md:m-10 lg:mt-[2.5vw]"
      style={{
        translateY,
        translateX,
        skewX,
        scale,
      }}
    >
      I use Modern <br />
      <mark className="mark">web technologies</mark>
    </motion.p>
  );
};

const TechImage = ({
  scrollY,
  inputRange,
  index,
  label,
  imgSrc,
  top,
  left,
}: (typeof allTech)[number] & {
  scrollY: MotionValue<number>;
  inputRange: number[];
  index: number;
}) => {
  const scale = useTransform(scrollY, inputRange, [0, 2]);

  return (
    <motion.div
      className="w-[200%] md:w-full h-full absolute top-0 -left-1/2 md:left-0"
      key={imgSrc}
      style={{
        scale,
      }}
    >
      <p className="sr-only">{label}</p>
      <div
        className={`relative tech-container__${index + 1}`}
        aria-hidden
        style={{
          top: top,
          left: left,
        }}
      >
        <Image
          src={imgSrc}
          alt={label}
          width={25}
          height={25}
          className="object-cover w-auto h-full"
          loading="eager"
          priority
        />
      </div>
    </motion.div>
  );
};

export const ZoomInAnimation = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const rotation = useTransform(scrollYProgress, [0, 1], ["0deg", "25deg"]);

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
      <div className="sticky h-screen top-0 overflow-hidden">
        <motion.div className="h-full" style={{ scale, rotate: rotation }}>
          <SlideOutText scrollY={scrollYProgress} />

          {allTech.map((tech, index) => (
            <TechImage
              key={tech.imgSrc}
              scrollY={scrollYProgress}
              inputRange={[
                index / allTech.length,
                index / allTech.length + 0.2,
              ]}
              index={index}
              {...tech}
            />
          ))}
        </motion.div>

        <div
          className="w-full h-full absolute top-0 flex justify-center items-center"
          aria-hidden
        >
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
