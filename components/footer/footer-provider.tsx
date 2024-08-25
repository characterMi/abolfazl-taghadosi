"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Curve } from "./curve";

export const FooterProvider = ({ children }: { children: React.ReactNode }) => {
  const footer = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: footer,
    offset: ["start end", "start start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);

  return (
    <footer
      className="min-h-[52rem] md:min-h-[28rem] h-screen mt-80 bg-neutral-900 py-6 px-4 sm:p-10 relative"
      ref={footer}
    >
      <Curve footerRef={footer} />
      <motion.div
        className="h-full w-full flex flex-col relative"
        style={{
          translateY,
        }}
      >
        {children}
      </motion.div>
    </footer>
  );
};
