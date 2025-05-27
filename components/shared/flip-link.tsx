"use client";

import { socials } from "@/constants";
import { ease } from "@/utils/motion";
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
    transition: `transform 500ms cubic-bezier(${ease})`,
    transitionDelay: `${i * 0.015}s`,
  });

  return (
    <a
      href={link}
      className={twMerge(
        "link relative overflow-hidden inline-flex group w-max leading-tight",
        containerClassName
      )}
      aria-label={title}
      {...linkProps}
    >
      <span aria-hidden>
        {title.split("").map((letter, i) => {
          return letter === " " ? (
            " "
          ) : (
            <span
              key={i}
              className={twMerge(
                "inline-block group-hover:-translate-y-full group-focus:-translate-y-full",
                childClassName
              )}
              style={transition(i)}
            >
              {letter}
            </span>
          );
        })}
      </span>
      <span className="absolute inset-0" aria-hidden>
        {title.split("").map((letter, i) => {
          return letter === " " ? (
            " "
          ) : (
            <span
              key={i}
              className={twMerge(
                "inline-block translate-y-full group-hover:translate-y-0 group-focus:translate-y-0",
                childClassName
              )}
              style={transition(i)}
            >
              {letter}
            </span>
          );
        })}
      </span>
    </a>
  );
};

export default FlipLink;
