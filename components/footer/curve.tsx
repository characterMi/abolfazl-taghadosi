"use client";

import { arrowSvg } from "@/constants";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { RefObject } from "react";

type PathProps = {
  d: string;
  range: number[];
  progress: MotionValue<number>;
};

function Path({ d, progress, range }: PathProps) {
  const opacity = useTransform(progress, range, [0, 1]);

  return <motion.path d={d} opacity={opacity} />;
}

export const Curve = ({
  footerRef,
}: {
  footerRef: RefObject<HTMLDivElement>;
}) => {
  const { scrollYProgress: svgCurveAnimation } = useScroll({
    target: footerRef,
    offset: ["start end", "start start"],
  });

  const { scrollYProgress: svgArrowAnimation } = useScroll({
    target: footerRef,
    offset: ["start end", "center end"],
  });

  const path = useTransform(
    svgCurveAnimation,
    [0, 1],
    [
      "M -1 0 L 1 0 C 1 1 0 1 0 1 C 0 1 -1 1 -1 0",
      "M -1 0 L 1 0 C 1 0 0 0 0 0 C 0 0 -1 0 -1 0",
    ]
  );
  const viewBox = useTransform(
    svgCurveAnimation,
    [0, 1],
    ["-0.5 0 1 1", "-1 0 2 0"]
  );

  return (
    <div className="absolute w-full top-0 left-0 flex flex-col items-center z-10">
      <div className="absolute -top-60 rotate-45 min-[1768px]:hidden">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="9.5rem"
          height="9.5rem"
          viewBox="0 0 128.000000 128.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)"
            className="fill-dark-blue"
            stroke="none"
          >
            {arrowSvg.map((d, i) => {
              const start = i / arrowSvg.length;
              const end = start + 1 / arrowSvg.length;

              return (
                <Path
                  d={d}
                  range={[start, end]}
                  progress={svgArrowAnimation}
                  key={d}
                />
              );
            })}
          </g>
        </svg>
      </div>

      <motion.svg className="w-full -mt-1" viewBox={viewBox}>
        <motion.path d={path} fill="#fff" />
      </motion.svg>
    </div>
  );
};
