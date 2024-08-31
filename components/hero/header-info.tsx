"use client";

import { fadeIn } from "@/utils/motion";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import GithubLink from "../shared/github-link";
import SlideUpAnimation from "../shared/slide-up-animation";

const ScrollToExplode = () => {
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 0) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return (
    <motion.div
      className="text-nowrap hidden md:block lg:text-[1.5vw] relative"
      variants={fadeIn}
      initial="initial"
      animate={isHidden ? "initial" : "animate"}
    >
      <motion.div
        className="w-1 h-full bg-primary absolute"
        animate={{ scaleY: [0, 1, 0], opacity: [0, 0.5, 1, 1, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{
          transformOrigin: "top",
          WebkitTransformOrigin: "top",
        }}
      />
      <SlideUpAnimation
        animate={"animate"}
        text={"Scroll"}
        type="single-word"
        animationProps={{ delay: 4.6 }}
        containerClassName="ml-4 lg:ml-[1vw]"
      />
      <br />

      <SlideUpAnimation
        animate={"animate"}
        text={"To Explode."}
        type="single-word"
        animationProps={{ delay: 4.8 }}
        containerClassName="ml-4 lg:ml-[1vw]"
      />
    </motion.div>
  );
};

export const HeaderInfo = () => {
  const text =
    "Empowering brands and startups to thrive in the digital world. Together, we'll craft innovative, high-impact websites that set new standards. No fluff, just cutting-edge solutions.";

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 justify-between">
      <div className="flex gap-4 lg:gap-[8vw]">
        <ScrollToExplode />

        <SlideUpAnimation
          animate={"animate"}
          text={text}
          type="multiple-word"
          animationProps={(i) => ({ delay: 5.2 + i * 0.025, duration: 0.8 })}
          containerClassName="text-[5vw] md:text-[1.5vw] lg:text-[1.2vw] lg:max-w-[30vw] gap-[0.8vw] md:gap-[0.3vw]"
          childClassName="leading-tight"
        />
      </div>

      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="initial"
        custom={{ delay: 6.5 }}
      >
        <GithubLink />
      </motion.div>
    </div>
  );
};
