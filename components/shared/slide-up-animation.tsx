import { slideUp } from "@/utils/motion";
import { motion, Transition } from "framer-motion";
import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  containerClassName?: string;
  childClassName?: string;
  animate: string;
  text: string;
  style?: CSSProperties;
} & (
  | {
      type: "single-word";
      animationProps?: Transition;
    }
  | {
      type: "multiple-word";
      animationProps?: (custom: number) => Transition;
    }
);

const SlideUpAnimation = ({
  type,
  text,
  containerClassName,
  animate,
  animationProps,
  childClassName,
  style,
}: Props) => {
  const defaultProps = {
    variants: slideUp,
    initial: "initial",
    exit: "initial",
    animate,
    className: "leading-[0.85] " + childClassName,
    style,
  };

  return (
    <p
      className={twMerge(
        "leading-tight",
        containerClassName,
        type === "multiple-word"
          ? "flex flex-wrap"
          : "relative inline-flex overflow-hidden"
      )}
    >
      {type === "multiple-word" ? (
        text.split(" ").map((word, i) => (
          <span key={i} className="relative inline-flex overflow-hidden">
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
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </p>
  );
};

export default SlideUpAnimation;
