"use client";

import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { motion, MotionValue, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";
import FlipLink from "../shared/flip-link";

type TextProps = {
  text: string;
  elementType: "link" | "mark" | "normal";
  progress: MotionValue<number>;
  placeholderProgress: MotionValue<number>;
  range: [number, number];
  link?: string;
};

const Text = ({
  text,
  range,
  progress,
  placeholderProgress,
  elementType,
  link,
}: TextProps) => {
  const shouldReduceMotion = useReduceMotion();
  const textOpacity = useTransform(progress, range, [0, 1]);
  const placeholderOpacity = useTransform(placeholderProgress, range, [0, 1]);

  return (
    <span aria-hidden className="relative select-none cursor-text">
      {!shouldReduceMotion && (
        <motion.span
          style={{ opacity: placeholderOpacity }}
          className="absolute text-transparent top-1/2 -translate-y-1/2 left-0 bg-zinc-300 rounded-md z-[-1] leading-none"
        >
          {text}
        </motion.span>
      )}
      <motion.span
        style={{ opacity: shouldReduceMotion ? 1 : textOpacity }}
        className={twMerge(
          "text-neutral-900 bg-white",
          elementType === "mark" && "decoration-dark-blue underline font-normal"
        )}
      >
        {elementType === "link" ? (
          <FlipLink
            link={link!}
            title={text}
            tabIndex={-1}
            containerClassName="font-bold"
            childClassName="dark-mark"
          />
        ) : (
          text
        )}
      </motion.span>
      &nbsp;
    </span>
  );
};

export const RevealText = ({
  texts,
  textScrollProgress,
  placeholderScrollProgress,
  range,
}: {
  texts: string[];
  textScrollProgress: MotionValue<number>;
  placeholderScrollProgress: MotionValue<number>;
  range: [number, number];
}) => {
  const amount = range[1] - range[0];
  const step = amount / texts.length;

  return (
    <p className="text-lg xss:text-xl sm:text-3xl lg:text-[2vw] !leading-normal font-thin px-4 lg:px-[1vw] flex flex-wrap">
      {/* For Accessibility */}
      <span
        className="sr-only"
        dangerouslySetInnerHTML={{
          __html: texts
            .map((text) => {
              const isLink = text.endsWith("link)");
              const normalizedText = text.split("(");

              if (isLink) {
                const link = normalizedText[1].split("link)")[0];
                return `<a href="${link}" target="_blank" rel="noopener noreferrer" class="inline">${normalizedText[0]} &nbsp;</a>`;
              }

              return normalizedText[0];
            })
            .join(" "),
        }}
      />

      {texts.map((text, i) => {
        const isLink = text.endsWith("link)");
        const isMark = text.endsWith("(mark)");

        const start = range[0] + step * i;
        const end = range[0] + step * (i + 1);

        const normalizedText = text.split("(");

        return (
          <Text
            text={normalizedText[0]}
            range={[start, end]}
            progress={textScrollProgress}
            placeholderProgress={placeholderScrollProgress}
            elementType={isLink ? "link" : isMark ? "mark" : "normal"}
            link={isLink ? normalizedText[1].split("link)")[0] : undefined}
            key={i}
          />
        );
      })}
    </p>
  );
};
