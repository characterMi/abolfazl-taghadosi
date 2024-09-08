"use client";

import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { motion } from "framer-motion";
import { MouseEvent, useRef, useState } from "react";

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isTouchDevice = useIsTouchDevice();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    if (!ref.current || isTouchDevice) return;

    const { clientX, clientY } = e;

    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  return (
    <motion.div
      className="relative"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={position}
      transition={{ type: "spring", stiffness: 350, damping: 5, mass: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
