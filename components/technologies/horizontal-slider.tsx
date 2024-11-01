"use client";

import { mainTech } from "@/constants";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type TechType = {
  label: string;
  imgSrc: string;
};

type CardProps = { tech: TechType; index: number };

const Card = ({ tech, index }: CardProps) => (
  <div className="relative size-96 lg:size-[24vw] overflow-hidden border-primary border p-10 lg:p-[2.5vw] bg-neutral-900/50">
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
        className="w-1/2 h-1/2 object-cover"
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
      className="relative h-[300vh] uppercase"
      aria-label="Technologies i use"
    >
      <div className="flex h-screen items-center justify-center overflow-hidden sticky top-0">
        <motion.div style={{ x, skewX }} className="flex gap-10 lg:gap-[2.5vw]">
          {mainTech.map((tech, index) => {
            return <Card tech={tech} index={index} key={tech.label} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};
