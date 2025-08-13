"use client";

import { useReduceMotion } from "@/hooks/use-reduce-motion";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useVelocity,
} from "framer-motion";
import { ComponentProps, RefObject, useRef } from "react";
import { twMerge } from "tailwind-merge";

export const HeroTitle = ({ isPageLoaded }: { isPageLoaded: boolean }) => {
  const shouldReduceMotion = useReduceMotion();

  const textRef = useRef<HTMLHeadingElement>(null);
  const container = useRef(null);
  const isInView = useInView(container);

  const direction = useRef<"left" | "right">("left");
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() || 0;
    const newDirection = latest > prev ? "left" : "right";
    direction.current = newDirection;
  });

  const speed = 40;
  const baseX = useRef(0);

  useAnimationFrame((_, delta) => {
    if (!isPageLoaded || !isInView || shouldReduceMotion) return;

    const scaledVelocity = Math.min(velocity.get(), 200);

    const speedWithVelocity =
      direction.current === "left"
        ? speed + scaledVelocity
        : speed - scaledVelocity;

    const moveBy = (speedWithVelocity * delta) / 1000;

    baseX.current += direction.current === "right" ? moveBy : -moveBy;

    const width = textRef.current?.offsetWidth ?? 0;
    if (width > 0) {
      baseX.current = ((baseX.current % -width) + -width) % -width;
    }

    x.set(baseX.current);
  });

  return (
    <div className="w-full overflow-hidden" ref={container}>
      <motion.div
        style={{ translateX: x, willChange: "transform" }}
        className="flex items-center whitespace-nowrap will-change-transform"
      >
        <HeroText textRef={textRef} shouldReduceMotion={shouldReduceMotion} />
        {!shouldReduceMotion && <HeroText aria-hidden />}
      </motion.div>
    </div>
  );
};

const HeroText = ({
  textRef,
  shouldReduceMotion,
  ...props
}: ComponentProps<"h1"> & {
  textRef?: RefObject<HTMLHeadingElement>;
  shouldReduceMotion?: boolean;
}) => (
  <h1
    className={twMerge(
      "!leading-[0.9] uppercase hero-mark text-nowrap whitespace-nowrap",
      shouldReduceMotion
        ? "text-[25vw] ml-[3vw]"
        : "text-[35vw] md:text-[25vw] flex items-center gap-[1.5vw]"
    )}
    ref={textRef}
    {...props}
  >
    <span className="font-FF">Abolfazl taghadosi</span>
    {!shouldReduceMotion && <span className="text-[15vw]"> — </span>}
  </h1>
);
