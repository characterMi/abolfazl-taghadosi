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

    const randomRotation = (Math.random() - 0.5) * 100;
    const randomX = (Math.random() - 0.5) * 100;
    const randomY = (Math.random() - 0.5) * 100;
    const randomScale = Math.random() + 0.5;

    return {
      rotate: [0, randomRotation, 0],
      x: [0, randomX, 0],
      y: [0, randomY, 0],
      scale: [1, randomScale, 1],
      transition: {
        ease: ease2,
        duration: 2,
        times: [0, 0.3, 1],
      },
    };
  }

  return (
    <p
      className="cursor-pointer overflow-visible inline-flex underline"
      onClick={handleClick}
      style={style}
    >
      {text.split("").map((letter, i) => (
        <motion.span
          key={i}
          initial={initial}
          animate={animate()}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          {letter}
        </motion.span>
      ))}
    </p>
  );
};

export default ExplodeAnimation;
