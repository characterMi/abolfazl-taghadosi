"use client";

import { arrowSvg } from "@/constants";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { RefObject } from "react";

type PathProps = {
  d: string;
  range: number[];
  progress: MotionValue<number>;
};

const initial = {
  path: "M -1 0 L 1 0 C 1 1 0 1 0 1 C 0 1 -1 1 -1 0",
  viewBox: "-0.5 0 1 1",
};

const target = {
  path: "M -1 0 L 1 0 C 1 0 0 0 0 0 C 0 0 -1 0 -1 0",
  viewBox: "-1 0 2 0",
};

function CurveSvg({
  path,
  viewBox,
}: {
  path: MotionValue<string>;
  viewBox: MotionValue<string>;
}) {
  return (
    <motion.svg className="w-full -mt-1" viewBox={viewBox}>
      <motion.path d={path} fill="#fff" />
    </motion.svg>
  );
}

function Path({ d, progress, range }: PathProps) {
  const opacity = useTransform(progress, range, [0, 1]);

  return <motion.path d={d} opacity={opacity} />;
}

export const Curve = ({
  footerRef,
}: {
  footerRef: RefObject<HTMLDivElement>;
}) => {
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "start start"],
  });

  const path = useTransform(
    scrollYProgress,
    [0, 1],
    [initial.path, target.path]
  );
  const viewBox = useTransform(
    scrollYProgress,
    [0, 1],
    [initial.viewBox, target.viewBox]
  );

  return (
    <div className="absolute w-full top-0 left-0 flex flex-col items-center z-10">
      <div className="absolute -top-48 rotate-45">
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
            fill="#ff98a2"
            stroke="none"
          >
            {arrowSvg.map((d, i) => {
              const start = i / arrowSvg.length;
              const end = start + 1 / arrowSvg.length;

              return (
                <Path
                  d={d}
                  range={[start, end]}
                  progress={scrollYProgress}
                  key={d}
                />
              );
            })}
          </g>
        </svg>
      </div>

      <CurveSvg path={path} viewBox={viewBox} />
    </div>
  );
};
