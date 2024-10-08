"use client";

import { socials } from "@/constants";
import { ease } from "@/utils/motion";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

type Props = (typeof socials)[number] & {
  containerClassName?: string;
  childClassName?: string;
  isBlank?: boolean;
};

const FlipLink = ({
  link,
  title,
  childClassName,
  containerClassName,
  isBlank,
}: Props) => {
  const linkProps = isBlank
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};
  const transition = (i: number) => ({
    ease,
    type: "tween",
    duration: 0.5,
    delay: i * 0.015,
  });

  return (
    <motion.a
      href={link}
      className={twMerge(
        "link relative overflow-hidden inline-flex group w-max leading-tight",
        containerClassName
      )}
      initial="initial"
      whileHover="hovered"
      {...linkProps}
    >
      <span>
        {title.split("").map((letter, i) => {
          return letter === " " ? (
            " "
          ) : (
            <motion.span
              key={i}
              variants={{
                initial: { y: 0 },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={transition(i)}
              className={twMerge("inline-block", childClassName)}
            >
              {letter}
            </motion.span>
          );
        })}
      </span>
      <span className="absolute inset-0" aria-hidden>
        {title.split("").map((letter, i) => {
          return letter === " " ? (
            " "
          ) : (
            <motion.span
              key={i}
              variants={{
                initial: { y: "100%" },
                hovered: {
                  y: 0,
                },
              }}
              transition={transition(i)}
              className={twMerge("inline-block", childClassName)}
            >
              {letter}
            </motion.span>
          );
        })}
      </span>
    </motion.a>
  );
};

export default FlipLink;
