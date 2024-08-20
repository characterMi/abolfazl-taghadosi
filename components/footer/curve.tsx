"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { RefObject } from "react";

const initial = {
  path: "M -1 0 L 1 0 C 1 1 0 1 0 1 C 0 1 -1 1 -1 0",
  viewBox: "-0.5 0 1 1",
};

const target = {
  path: "M -1 0 L 1 0 C 1 0 0 0 0 0 C 0 0 -1 0 -1 0",
  viewBox: "-1 0 2 0",
};

const pathAnimation = {
  initial: {
    d: initial.path,
  },
  enter: {
    d: target.path,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    d: initial.path,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const viewBoxAnimation = {
  initial: {
    viewBox: initial.viewBox,
  },
  enter: {
    viewBox: target.viewBox,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    viewBox: initial.viewBox,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

function CurveSvg({
  path,
  viewBox,
}: {
  path: MotionValue<string>;
  viewBox: MotionValue<string>;
}) {
  return (
    <motion.svg className="w-full -mt-1" viewBox={viewBox}>
      <motion.path d={path} fill="#fff" />
    </motion.svg>
  );
}

export const Curve = ({
  footerRef,
}: {
  footerRef: RefObject<HTMLDivElement>;
}) => {
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "start 0.25"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const path = useTransform(
    scrollYProgress,
    [0, 1],
    [initial.path, target.path]
  );
  const viewBox = useTransform(
    scrollYProgress,
    [0, 1],
    [initial.viewBox, target.viewBox]
  );

  return (
    <div className="absolute w-full top-0 left-0 flex flex-col items-center z-10">
      <motion.div
        className="absolute -top-12"
        style={{ opacity }}
        animate={{ y: [0, 28, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <Image
          src="/icons/arrow.svg"
          alt="Arrow"
          width={25}
          height={25}
          className="size-32 rotate-45"
        />
      </motion.div>

      <CurveSvg path={path} viewBox={viewBox} />
    </div>
  );
};
