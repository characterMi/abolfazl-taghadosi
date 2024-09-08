"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const CustomScroll = () => {
  const { scrollYProgress } = useScroll();

  const background = useTransform(
    scrollYProgress,
    [0, 1],
    // a mix between primary and dark blue...
    ["rgb(86 204 242)", "rgb(50, 162, 199)"]
  );

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 w-full z-50"
      style={{
        transformOrigin: "left",
        WebkitTransformOrigin: "left",
        scaleX: scrollYProgress,
        background,
      }}
    />
  );
};

export default CustomScroll;
