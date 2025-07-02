"use client";

import { socials } from "@/constants";
import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { ease } from "@/utils/motion";
import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = (typeof socials)[number] & {
  containerClassName?: string;
  childClassName?: string;
  isBlank?: boolean;
} & ComponentProps<"a">;

const FlipLink = forwardRef(
  (
    {
      link,
      title,
      childClassName,
      containerClassName,
      isBlank,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const shouldReduceMotion = useReduceMotion();
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
        ref={ref}
        href={link}
        className={twMerge(
          "link relative overflow-hidden inline-flex w-max leading-tight",
          !shouldReduceMotion && "group",
          containerClassName
        )}
        aria-label={title}
        {...linkProps}
        {...props}
      >
        <span aria-hidden>
          {title.split("").map((letter, i) => {
            return letter === " " ? (
              " "
            ) : (
              <span
                key={i}
                className={twMerge(
                  "inline-block group-hover:-translate-y-full group-focus-visible:-translate-y-full",
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
          {!shouldReduceMotion &&
            title.split("").map((letter, i) => {
              return letter === " " ? (
                " "
              ) : (
                <span
                  key={i}
                  className={twMerge(
                    "inline-block translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0",
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
  }
);

FlipLink.displayName = "FlipLink";

export default FlipLink;
