import { arrowSvg } from "@/constants";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import RevealAnimation from "../shared/reveal-animation";

export const ArrowSvg = () => {
  const arrow = useRef(null);

  const { scrollYProgress } = useScroll({
    target: arrow,
    offset: ["start center", "start start"],
  });

  return (
    <svg
      ref={arrow}
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="4rem"
      height="12rem"
      viewBox="-620 350 350.000000 150.000000"
      preserveAspectRatio="xMidYMid meet"
      className="w-16 h-48 lg:w-[5.5vw] lg:h-[17.5vw]"
      style={{
        transform: "rotateX(180deg)",
      }}
    >
      <g
        transform="translate(0.000000,900.000000) scale(0.100000,-0.100000) rotate(90)"
        className="fill-dark-blue"
        stroke="none"
      >
        {arrowSvg.map((d, i) => {
          const start = i / arrowSvg.length;
          const end = start + 1 / arrowSvg.length;

          return (
            <RevealAnimation
              d={d}
              range={[start, end]}
              progress={scrollYProgress}
              key={d}
            />
          );
        })}
      </g>
    </svg>
  );
};
