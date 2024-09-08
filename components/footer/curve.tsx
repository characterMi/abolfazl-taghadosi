"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { RefObject } from "react";

export const Curve = ({
  footerRef,
}: {
  footerRef: RefObject<HTMLDivElement>;
}) => {
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "start start"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["50vh", "0vh"]);

  return (
    <div className="absolute w-full top-0 left-0 flex flex-col items-center z-10">
      <motion.div
        className="w-[110vw] rounded-b-[100%] bg-white shadow-[0_0_50px_#171717]"
        style={{ height }}
      />
    </div>
  );
};
