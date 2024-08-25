"use client";

import { fadeIn, slideUp } from "@/utils/motion";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import GithubLink from "../shared/github-link";

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
        className="w-1 h-full bg-pink absolute"
        animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
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
      <p className="slide-up-animation ml-2 lg:ml-[1vw]">
        <motion.span
          custom={{ duration: 1.2, delay: 4.6 }}
          variants={slideUp}
          initial="initial"
          animate="animate"
          exit="initial"
        >
          Scroll
        </motion.span>
      </p>
      <br />
      <p className="slide-up-animation ml-2 lg:ml-[1vw]">
        <motion.span
          custom={{ duration: 1.2, delay: 4.8 }}
          variants={slideUp}
          initial="initial"
          animate="animate"
          exit="initial"
        >
          To Explode.
        </motion.span>
      </p>
    </motion.div>
  );
};

export const HeaderInfo = () => {
  const text =
    "Skilled web developer with experience in TypeScript and JavaScript, and expertise in frameworks like React, Next.js, TailwindCSS and Three.js.";

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 justify-between">
      <div className="flex gap-4 lg:gap-20">
        <ScrollToExplode />

        <h3 className="text-[5vw] md:text-[1.5vw] lg:text-[1.2vw] lg:max-w-[30vw] slide-up-animation gap-[0.8vw] md:gap-[0.2vw] flex-wrap">
          {text.split(" ").map((word, i) => (
            <motion.span
              key={i}
              custom={{ duration: 1.2, delay: 5.2 + i * 0.05 }}
              variants={slideUp}
              initial="initial"
              animate="animate"
              exit="initial"
            >
              {word}
            </motion.span>
          ))}
        </h3>
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
