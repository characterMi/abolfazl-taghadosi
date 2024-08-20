"use client";

import { mainTech } from "@/constants";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type TechType = {
  label: string;
  imgSrc: string;
};

type CardProps = { tech: TechType; index: number };

export const HorizontalSlider = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end center"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["80%", "-50%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="flex h-screen items-center justify-center overflow-hidden sticky top-0">
        <motion.div style={{ x }} className="flex gap-10">
          {mainTech.map((tech, index) => {
            return <Card tech={tech} index={index} key={tech.label} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ tech, index }: CardProps) => {
  return (
    <div className="relative size-96 overflow-hidden border-pink border p-10">
      <p className="text-7xl absolute top-6 left-6 text-pink font-black">
        {index < 10 ? `0${index + 1}` : index + 1}
      </p>

      <div className="flex flex-col justify-between items-center w-full h-full">
        <div />

        <Image
          src={tech.imgSrc}
          alt={tech.label}
          width={25}
          height={25}
          className="w-1/2 h-1/2 object-cover"
        />

        <p className="text-3xl">{tech.label}</p>
      </div>
    </div>
  );
};
