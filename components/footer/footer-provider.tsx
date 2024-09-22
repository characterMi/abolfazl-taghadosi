"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Curve = ({ height }: { height: MotionValue<string> }) => {
  return (
    <div className="absolute w-full top-0 left-0 flex flex-col items-center z-10">
      <motion.div
        className="w-[110vw] rounded-b-[100%] bg-white shadow-[0_0_50px_#171717]"
        style={{ height }}
      />
    </div>
  );
};

export const FooterProvider = ({ children }: { children: React.ReactNode }) => {
  const footer = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: footer,
    offset: ["start end", "start start"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["50vh", "0vh"]);

  return (
    <footer
      className="min-h-[52rem] md:min-h-[28rem] h-screen bg-gradient-to-r from-neutral-950 to-neutral-900 py-6 px-4 sm:p-10 lg:p-[2.5vw] relative z-[1] flex flex-col overflow-hidden"
      ref={footer}
      id="contact"
    >
      <Curve height={height} />
      {children}
    </footer>
  );
};
