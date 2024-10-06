"use client";

import { motion, useScroll } from "framer-motion";

const CustomScroll = () => {
  const { scrollYProgress: scaleX } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 w-full z-50 bg-gradient-to-r from-dark-blue to-primary"
      style={{
        transformOrigin: "left",
        WebkitTransformOrigin: "left",
        scaleX,
      }}
    />
  );
};

export default CustomScroll;
