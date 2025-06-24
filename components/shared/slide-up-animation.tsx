"use client";

import { slideUp, type SlideUpVariant } from "@/utils/motion";
import { motion } from "framer-motion";
import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: string;
  containerClassName?: string;
  childClassName?: string;
  style?: CSSProperties;
} & (
  | {
      animate?: undefined;
      whileInView: string;
    }
  | {
      animate: string;
      whileInView?: undefined;
    }
) &
  (
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
  children,
  type,
  containerClassName,
  animate,
  animationProps,
  childClassName,
  style,
  whileInView,
}: Props) => {
  const defaultProps = {
    variants: slideUp,
    initial: "initial",
    animate,
    whileInView,
    viewport: { once: true },
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
