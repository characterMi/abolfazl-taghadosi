"use client";

import { notFound } from "@/constants";
import { motion, useMotionValue } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";

type DefaultProps = {
  d: string;
  vectorEffect: "non-scaling-stroke";
  strokeLinecap: "round" | "inherit" | "butt" | "square" | undefined;
  fillRule: "evenodd" | "inherit" | "nonzero" | undefined;
  fontSize: string;
};

const Gradient = ({
  index,
  container,
  children,
}: {
  container: RefObject<HTMLDivElement>;
  index: number;
  children: React.ReactNode;
}) => {
  const tracker = {
    x: useMotionValue("-100%"),
    y: useMotionValue("-100%"),
  };

  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      if (!container.current) return;

      const { clientX, clientY } = e;
      const { height, left, top, width } =
        container.current.getBoundingClientRect();

      const percentX = width / 100;
      const percentY = height / 100;

      const x = (clientX - left) / percentX;
      const y = (clientY - top) / percentY;

      tracker.x.set(`${x}%`);
      tracker.y.set(`${y}%`);
    }

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <motion.radialGradient
      id={`grad_${index}`}
      cx={tracker.x}
      cy={tracker.y}
      r="100%"
      fx={tracker.x}
      fy={tracker.y}
    >
      {children}
    </motion.radialGradient>
  );
};

const Svg = ({
  d,
  viewBox,
  index,
}: (typeof notFound)[number] & { index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const defaultProps: DefaultProps = {
    d,
    vectorEffect: "non-scaling-stroke",
    strokeLinecap: "round",
    fillRule: "evenodd",
    fontSize: "9pt",
  };

  return (
    <div
      ref={ref}
      className="w-full sm:max-w-screen-smart-watch min-[2000px]:max-w-screen-lg"
    >
      <svg width="100%" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <Gradient index={index} container={ref}>
            <stop offset="0%" stopColor="#56ccf2" />
            <stop offset="100%" stopColor="transparent" />
          </Gradient>
        </defs>

        <path
          {...defaultProps}
          stroke="#262626"
          strokeWidth="2mm"
          fill="#262626"
          style={{
            stroke: "#262626",
            strokeWidth: "2mm",
            fill: "#262626",
          }}
        />

        <path
          {...defaultProps}
          stroke={`url(#grad_${index})`}
          strokeWidth="2mm"
          fill={`url(#grad_${index})`}
          style={{
            stroke: `url(#grad_${index})`,
            strokeWidth: "2mm",
            fill: `url(#grad_${index})`,
          }}
        />

        <path
          {...defaultProps}
          stroke="#171717"
          strokeWidth="1mm"
          fill="#171717"
          style={{ stroke: "#171717", strokeWidth: "1mm", fill: "#171717" }}
          className="opacity-95"
        />
      </svg>
    </div>
  );
};

export default Svg;
