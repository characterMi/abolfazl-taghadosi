"use client";

import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { motion, useSpring } from "framer-motion";
import { MouseEvent, useRef } from "react";

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isTouchDevice = useIsTouchDevice();
  const positionOptions = { stiffness: 100, damping: 5, mass: 0.5 };

  const x = useSpring(0, positionOptions),
    y = useSpring(0, positionOptions);

  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    if (!ref.current || isTouchDevice) return;

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
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
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
