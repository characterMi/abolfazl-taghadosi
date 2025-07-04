"use client";

import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { HTMLMotionProps, motion, SVGMotionProps } from "framer-motion";
import { ForwardedRef, forwardRef, ReactHTML, ReactNode } from "react";

type MotionElementType = keyof SVGElementTagNameMap | keyof ReactHTML;

type MotionProps<T extends MotionElementType> =
  T extends keyof SVGElementTagNameMap
    ? SVGMotionProps<T>
    : T extends keyof ReactHTML
    ? HTMLMotionProps<T>
    : never;

type MotionWrapperProps<T extends MotionElementType> = {
  as?: T;
  children?: ReactNode;
} & MotionProps<T>;

const Motion = forwardRef(
  <T extends MotionElementType>(
    {
      as,
      children,
      variants,
      initial,
      animate,
      exit,
      whileInView,
      whileTap,
      whileHover,
      whileFocus,
      whileDrag,
      transition,
      ...rest
    }: MotionWrapperProps<T>,
    ref: ForwardedRef<HTMLElement | SVGElement> | undefined
  ) => {
    // @ts-ignore
    const Component = motion[as ?? "div"];
    const shouldReduceMotion = useReduceMotion();

    return (
      <Component
        ref={ref}
        variants={shouldReduceMotion ? undefined : variants}
        initial={shouldReduceMotion ? undefined : initial}
        animate={shouldReduceMotion ? undefined : animate}
        whileInView={shouldReduceMotion ? undefined : whileInView}
        whileTap={shouldReduceMotion ? undefined : whileTap}
        whileHover={shouldReduceMotion ? undefined : whileHover}
        whileFocus={shouldReduceMotion ? undefined : whileFocus}
        whileDrag={shouldReduceMotion ? undefined : whileDrag}
        exit={shouldReduceMotion ? undefined : exit}
        transition={shouldReduceMotion ? undefined : transition}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Motion.displayName = "Motion";

export default Motion;
