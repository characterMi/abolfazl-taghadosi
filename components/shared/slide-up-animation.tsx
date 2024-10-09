"use client";

import { slideUp, type SlideUpVariant } from "@/utils/motion";
import { motion } from "framer-motion";
import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  containerClassName?: string;
  childClassName?: string;
  animate: string;
  style?: CSSProperties;
} & (
  | {
      type: "single-word";
      children: string;
      animationProps?: SlideUpVariant;
    }
  | {
      type: "multiple-word";
      children: string[];
      animationProps?: (custom: number) => SlideUpVariant;
    }
);

const SlideUpAnimation = ({
  type,
  children,
  containerClassName,
  animate,
  animationProps,
  childClassName,
  style,
}: Props) => {
  const defaultProps = {
    variants: slideUp,
    initial: "initial",
    animate,
    exit: "exit",
    className: "leading-[0.85] " + childClassName,
    style,
  };

  const textContainerDefaultClass = "relative inline-flex overflow-hidden";

  return (
    <p
      className={twMerge(
        "leading-tight",
        containerClassName,
        type === "single-word" ? textContainerDefaultClass : "flex flex-wrap"
      )}
    >
      {type === "multiple-word" ? (
        children.map((word, i) => (
          <span key={i} className={textContainerDefaultClass}>
            <motion.span
              {...defaultProps}
              custom={animationProps?.(i)}
              dangerouslySetInnerHTML={{ __html: word }}
            />
          </span>
        ))
      ) : (
        <motion.span
          {...defaultProps}
          custom={animationProps}
          dangerouslySetInnerHTML={{ __html: children }}
        />
      )}
    </p>
  );
};

export default SlideUpAnimation;
