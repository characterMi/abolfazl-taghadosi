"use client";

import { fadeInWithBlur } from "@/utils/motion";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const Description = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.p
      className="text-neutral-900 text-3xl lg:text-[2.5vw] leading-tight font-thin"
      variants={fadeInWithBlur}
      initial="initial"
      animate={isInView ? "animate" : ""}
      exit="initial"
      ref={ref}
      style={{ willChange: "filter, opacity" }}
    >
      The following projects highlight my skills and experience through{" "}
      <mark className="dark-mark font-medium">real-world examples</mark> of what
      I&apos;ve built. They demonstrate my ability to tackle complex problems,
      work across various technologies, and manage projects efficiently from
      start to finish.
    </motion.p>
  );
};
