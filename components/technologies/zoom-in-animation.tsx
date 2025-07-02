"use client";

import { allTech } from "@/constants";
import { useReduceMotion } from "@/hooks/use-reduce-motion";
import TornPaper from "@/public/images/torn-paper.svg";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

const SlideOutText = ({
  scrollY,
  shouldReduceMotion,
}: {
  scrollY: MotionValue<number>;
  shouldReduceMotion: boolean;
}) => {
  const translateX = useTransform(scrollY, [0, 1], ["0%", "-10%"]);
  const translateY = useTransform(scrollY, [0, 1], ["0%", "-300%"]);
  const skewX = useTransform(scrollY, [0, 1], ["0deg", "50deg"]);
  const scale = useTransform(scrollY, [0, 1], [1, 2]);

  return (
    <motion.p
      className={twMerge(
        "title m-4 md:m-10 lg:mt-[2.5vw]",
        shouldReduceMotion && "text-center"
      )}
      style={
        shouldReduceMotion
          ? undefined
          : {
              translateY,
              translateX,
              skewX,
              scale,
            }
      }
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

const ReducedMotionTechImages = () => {
  const container = useRef(null);
  const MotionImage = motion(Image);

  return (
    <div className="absolute w-full h-full" ref={container}>
      {allTech.map(({ imgSrc, label }) => (
        <MotionImage
          key={imgSrc}
          src={imgSrc}
          alt={label}
          width={25}
          height={25}
          className="object-cover w-6 md:w-8 lg:w-[3vw] absolute"
          loading="eager"
          priority
          drag
          dragConstraints={container}
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            rotate: `${(Math.random() - 0.5) * 45}deg`,
            scale: Math.random() * (1.3 - 0.9) + 0.9,
          }}
        />
      ))}
    </div>
  );
};

export const ZoomInAnimation = () => {
  const shouldReduceMotion = useReduceMotion();

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
      className={twMerge(
        "relative shadow-[0_10px_0_#fff] z-[1]",
        !shouldReduceMotion && "h-[500vh] "
      )}
      id="zoom-in-animation"
    >
      <div
        className={twMerge(
          "sticky h-screen top-0",
          !shouldReduceMotion && "overflow-hidden"
        )}
      >
        <motion.div
          className={twMerge(
            "h-full",
            shouldReduceMotion && "flex items-center justify-center"
          )}
          style={shouldReduceMotion ? undefined : { scale, rotate: rotation }}
        >
          <SlideOutText
            scrollY={scrollYProgress}
            shouldReduceMotion={shouldReduceMotion}
          />

          {shouldReduceMotion ? (
            <ReducedMotionTechImages />
          ) : (
            allTech.map((tech, index) => (
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
            ))
          )}
        </motion.div>

        {!shouldReduceMotion && (
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
        )}
      </div>

      {shouldReduceMotion && (
        <Image
          src={TornPaper}
          alt=""
          aria-hidden
          className="absolute bottom-0 left-0 w-full object-cover pointer-events-none shadow-[0_10px_0_#fff] -z-[1]"
        />
      )}
    </div>
  );
};
