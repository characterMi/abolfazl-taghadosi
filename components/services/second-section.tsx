"use client";

import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FlipLink from "../shared/flip-link";
import SlideUpAnimation from "../shared/slide-up-animation";

export const SecondSection = () => {
  const shouldReduceMotion = useReduceMotion();

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
          style={{ translateY: shouldReduceMotion ? 0 : indicatorY }}
          aria-hidden
        />

        <div className="p-4 sm:p-10 leading-[0.8]">
          <span className="sr-only">Get in Touch!</span>

          <SlideUpAnimation
            animate={isInView ? "animate" : ""}
            type="single-word"
            animationProps={{ animate: { delay: 0.5 } }}
            childClassName="leading-[0.85]"
            isHidden
          >
            Get in
          </SlideUpAnimation>

          <br aria-hidden />

          <SlideUpAnimation
            animate={isInView ? "animate" : ""}
            type="single-word"
            animationProps={{ animate: { delay: 0.6 } }}
            childClassName="leading-[0.85] mark"
            isHidden
          >
            Touch
          </SlideUpAnimation>
        </div>
      </div>

      <motion.div
        style={{ translateY: shouldReduceMotion ? 0 : textY }}
        className="flex flex-col lg:justify-around h-full"
      >
        <p className="font-semibold text-xs smart-watch:text-base lg:text-[1vw] !leading-tight">
          Have a project in mind, a question, or just want to connect? Whatever
          it is, I&apos;m ready to chat. Feel free to{" "}
          <FlipLink
            link="mailto:workabolfazltaghadosi@gmail.com"
            title="reach out"
            childClassName="mark"
            isBlank
          />{" "}
          and let&apos;s explore what we could create together.
        </p>
      </motion.div>
    </div>
  );
};
