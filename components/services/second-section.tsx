"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SlideUpAnimation from "../shared/slide-up-animation";
import SlideUpLink from "../shared/slide-up-link";

export const SecondSection = () => {
  const target = useRef(null);
  const isInView = useInView(target, { once: true });

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });

  const indicatorY = useTransform(scrollYProgress, [0, 1], ["80%", "-40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  return (
    <div
      className="mt-80 lg:mt-[20vw] h-screen min-h-max w-full lg:max-w-[65vw] mx-auto flex flex-col lg:flex-row gap-20 lg:gap-[5vw] relative"
      ref={target}
    >
      <div className="flex gap-4 xss:gap-8 lg:gap-[2vw] items-center uppercase text-3xl smart-watch:text-5xl xss:text-7xl sm:text-8xl lg:text-[6vw] font-black relative">
        <motion.div
          className="h-[30vw] w-1 lg:w-[0.25vw] bg-primary"
          style={{ translateY: indicatorY }}
        />

        <div className="p-4 sm:p-10 leading-[0.8]">
          <SlideUpAnimation
            animate={isInView ? "animate" : ""}
            text={"Get in"}
            type="single-word"
            animationProps={{ delay: 0.5 }}
            childClassName="leading-[0.85]"
          />

          <br />

          <SlideUpAnimation
            animate={isInView ? "animate" : ""}
            text={"Touch"}
            type="single-word"
            animationProps={{ delay: 0.6 }}
            childClassName="leading-[0.85] mark"
          />
        </div>
      </div>

      <motion.div
        style={{ translateY: textY }}
        className="flex flex-col lg:justify-around h-full"
      >
        <p className="font-semibold text-xs smart-watch:text-base lg:text-[1vw] !leading-tight">
          I&apos;m exited to hear from You! whether you have questions, ideas,
          or want to collaborate,{" "}
          <SlideUpLink
            link="mailto:abol1385fx@gmail.com"
            title="reach out"
            childClassName="mark"
          />{" "}
          and let&apos;s start a conversion that could lead to inspiring
          possibilities. Your next big project awaits!
        </p>
      </motion.div>
    </div>
  );
};
