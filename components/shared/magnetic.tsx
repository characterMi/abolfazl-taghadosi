"use client";

import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { motion, useSpring } from "framer-motion";
import { MouseEvent, useRef } from "react";

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isTouchDevice = useIsTouchDevice();
  const smoothPositionOptions = { stiffness: 100, damping: 5, mass: 0.5 };

  const smoothPosition = {
    x: useSpring(0, smoothPositionOptions),
    y: useSpring(0, smoothPositionOptions),
  };

  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    if (!ref.current || isTouchDevice) return;

    const { clientX, clientY } = e;

    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    smoothPosition.x.set(middleX * 0.3);
    smoothPosition.y.set(middleY * 0.3);
  };

  return (
    <motion.div
      className="relative"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        smoothPosition.x.set(0);
        smoothPosition.y.set(0);
      }}
      style={{
        x: smoothPosition.x,
        y: smoothPosition.y,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
