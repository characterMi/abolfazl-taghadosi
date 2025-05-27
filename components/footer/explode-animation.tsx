"use client";

import { ease2 } from "@/utils/motion";
import { motion, type TargetAndTransition } from "framer-motion";
import { type CSSProperties, useState } from "react";

type Props = {
  text: string;
  style?: CSSProperties;
};

const ExplodeAnimation = ({ text, style }: Props) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const initial = {
    rotate: 0,
    x: 0,
    y: 0,
    scale: 1,
  };

  function handleClick() {
    if (isAnimating) return;

    setIsAnimating(true);
  }

  function animate(): TargetAndTransition {
    if (!isAnimating) return {};

    const colors = ["#FFFFFF", "#56ccf2", "#b6edff", "#32a2c7"];

    return {
      // 0%, 100% { rotate: 0 } 50% { rotate: -58 }
      rotate: [0, (Math.random() - 0.5) * 100, 0],
      x: [0, (Math.random() - 0.5) * 100, 0],
      y: [0, (Math.random() - 0.5) * 100, 0],
      color: [colors[0], colors[~~(Math.random() * colors.length)], colors[0]],
      scale: [1, (Math.random() + 0.5).toFixed(2), 1],
      transition: {
        ease: ease2,
        duration: 2,
        times: [0, 0.3, 1],
      },
    };
  }

  return (
    <p
      className="cursor-pointer overflow-visible inline-flex"
      onClick={handleClick}
      style={style}
    >
      {text.split("").map((letter, i) => {
        if (letter === " ") return <span key={i}>&nbsp;</span>;

        return (
          <motion.span
            key={i}
            initial={initial}
            animate={animate()}
            onAnimationComplete={() => setIsAnimating(false)}
            className="underline"
          >
            {letter}
          </motion.span>
        );
      })}
    </p>
  );
};

export default ExplodeAnimation;
