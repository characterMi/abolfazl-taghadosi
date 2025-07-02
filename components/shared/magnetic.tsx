"use client";

import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { motion, useSpring } from "framer-motion";
import { PointerEvent, useRef } from "react";

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReduceMotion();
  const positionOptions = { stiffness: 100, damping: 5, mass: 0.5 };

  const x = useSpring(0, positionOptions),
    y = useSpring(0, positionOptions);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!ref.current || shouldReduceMotion) return;

    const { clientX, clientY } = e;

    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  return (
    <motion.div
      className="relative"
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
