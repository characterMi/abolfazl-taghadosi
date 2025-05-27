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
  children: string;
} & (
  | {
      type: "single-word";
      animationProps?: SlideUpVariant;
    }
  | {
      type: "multiple-word";
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
      <span className="sr-only">{children}</span>

      {type === "multiple-word" ? (
        children.split(" ").map((word, i) => (
          <span key={i} className={textContainerDefaultClass} aria-hidden>
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
          aria-hidden
        />
      )}
    </p>
  );
};

export default SlideUpAnimation;
