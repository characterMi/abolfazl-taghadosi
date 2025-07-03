"use client";

import { mainTech } from "@/constants";
import { useReduceMotion } from "@/hooks/use-reduce-motion";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

type TechType = {
  label: string;
  imgSrc: string;
};

type CardProps = { tech: TechType; index: number; shouldReduceMotion: boolean };

const Card = ({ tech, index, shouldReduceMotion }: CardProps) => (
  <div
    className={twMerge(
      "relative h-96 lg:h-[24vw] max-h-[80vh] aspect-square overflow-hidden border-primary border p-10 lg:p-[2.5vw] bg-neutral-900/50",
      shouldReduceMotion && "max-w-[90vw]"
    )}
  >
    <p
      className="text-7xl lg:text-[4.5vw] absolute top-6 lg:top-[1.5vw] left-6 lg:left-[1.5vw] font-black mark"
      aria-hidden
    >
      {index < 10 ? `0${index + 1}` : index + 1}
    </p>

    <div className="flex flex-col justify-between items-center w-full h-full pt-6 lg:pt-[1.5vw]">
      <div aria-hidden />

      <Image
        src={tech.imgSrc}
        alt={tech.label + " image"}
        width={25}
        height={25}
        className="w-1/2 object-cover"
        loading="eager"
        priority
      />

      <p className="text-6xl lg:text-[4vw] font-FF tracking-wide leading-[0.6]">
        {tech.label}
      </p>
    </div>
  </div>
);

export const HorizontalSlider = () => {
  const shouldReduceMotion = useReduceMotion();

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end center"],
  });

  const skewXVelocity = useVelocity(scrollYProgress);

  const rawSkewX = useTransform(skewXVelocity, [-1, 1], ["-5deg", "5deg"]);

  const skewX = useSpring(rawSkewX, {
    damping: 10,
    stiffness: 100,
    mass: 1,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["80%", "-50%"]);

  return (
    <section
      ref={targetRef}
      className={twMerge(
        "relative uppercase",
        !shouldReduceMotion && "h-[300vh]"
      )}
      aria-label="Technologies i use"
    >
      <div
        className={twMerge(
          "flex items-center justify-center overflow-hidden sticky top-0",
          !shouldReduceMotion && "h-screen"
        )}
      >
        <motion.div
          style={shouldReduceMotion ? undefined : { x, skewX }}
          className={twMerge(
            "flex gap-10 lg:gap-[2.5vw]",
            shouldReduceMotion && "flex-wrap justify-center"
          )}
        >
          {mainTech.map((tech, index) => {
            return (
              <Card
                tech={tech}
                index={index}
                key={tech.label}
                shouldReduceMotion={shouldReduceMotion}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
