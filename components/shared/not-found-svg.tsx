"use client";

import { notFound } from "@/constants";
import { useNotFoundPageAnimation } from "@/hooks/use-not-found-page-animation";
import { motion } from "framer-motion";
import { useRef } from "react";

type DefaultProps = {
  d: string;
  vectorEffect: "non-scaling-stroke";
  strokeLinecap: "round" | "inherit" | "butt" | "square" | undefined;
  fillRule: "evenodd" | "inherit" | "nonzero" | undefined;
  fontSize: string;
};

const Svg = ({
  d,
  viewBox,
  index,
}: (typeof notFound)[number] & { index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const tracker = useNotFoundPageAnimation(ref);

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
          <motion.radialGradient
            id={`grad_${index}`}
            cx={tracker.x}
            cy={tracker.y}
            r="100%"
            fx={tracker.x}
            fy={tracker.y}
          >
            <stop offset="0%" stopColor="#56ccf2" />
            <stop offset="100%" stopColor="transparent" />
          </motion.radialGradient>
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
