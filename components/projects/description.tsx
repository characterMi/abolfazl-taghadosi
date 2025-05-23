"use client";

import { fadeInWithBlur } from "@/utils/motion";
import { motion } from "framer-motion";

export const Description = () => {
  return (
    <motion.p
      className="text-neutral-900 text-3xl lg:text-[2.5vw] leading-tight font-thin"
      variants={fadeInWithBlur}
      initial="initial"
      whileInView={"animate"}
      viewport={{ once: true }}
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
