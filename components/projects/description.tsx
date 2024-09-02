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
    >
      Following projects showcases my skills and experience through{" "}
      <mark className="dark-mark">real-world examples</mark> of my work. Each
      project is briefly described with links to code repositories and live
      demos in it. It reflects my ability to solve complex problems, work with
      different technologies, and manage projects effectively.
    </motion.p>
  );
};
