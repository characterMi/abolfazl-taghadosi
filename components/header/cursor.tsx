"use client";

import WaveEffect from "@/components/shared/wave-effect";
import { useCustomCursorAnimation } from "@/hooks/use-custom-cursor-animation";
import { wait } from "@/lib";
import { fadeInWithBlur } from "@/utils/motion";
import { motion, MotionValue } from "framer-motion";
import { memo, RefObject, useEffect, useState } from "react";

const InnerCursor = ({
  isHoveredOnMenu,
  isHoveredOnProjectCardOrGithubLink,
  innerDivRef,
  innerDivScale,
}: {
  isHoveredOnMenu: boolean;
  isHoveredOnProjectCardOrGithubLink: boolean;
  innerDivRef: RefObject<HTMLDivElement>;
  innerDivScale: { x: MotionValue<number>; y: MotionValue<number> };
}) => {
  const template = ({
    rotate,
    scaleX,
    scaleY,
  }: {
    rotate: number;
    scaleX: number;
    scaleY: number;
  }) => `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`;

  return (
    <>
      <motion.div
        transformTemplate={template}
        className="absolute top-0 left-0 w-full h-full rounded-full overflow-hidden flex items-center justify-center border border-primary"
        style={{
          scaleX: innerDivScale.x,
          scaleY: innerDivScale.y,
        }}
        ref={innerDivRef}
      >
        <WaveEffect
          condition={isHoveredOnMenu || isHoveredOnProjectCardOrGithubLink}
        />
      </motion.div>

      {"VIEW".split("").map((letter, i) => (
        <motion.span
          className="pointer-events-none z-[1]"
          style={{ willChange: "filter, opacity" }}
          key={letter}
          variants={fadeInWithBlur}
          custom={{ delay: (i + 1) * 0.1, duration: 0.2 }}
          initial="initial"
          animate={isHoveredOnProjectCardOrGithubLink ? "animate" : ""}
        >
          {letter}
        </motion.span>
      ))}
    </>
  );
};

const Cursor = ({ menu }: { menu: React.RefObject<HTMLDivElement> }) => {
  const {
    cursorRef,
    innerDivRef,
    cursorSize,
    smoothMouse,
    innerDivScale,
    isHoveredOnMenu,
    isHoveredOnProjectCardOrGithubLink,
  } = useCustomCursorAnimation(menu);

  return (
    <motion.div
      aria-hidden
      id="cursor"
      className="size-[2.5vw] rounded-full fixed pointer-events-none z-[49] text-[0.5vw] flex items-center justify-center"
      style={{
        x: smoothMouse.x,
        y: smoothMouse.y,
        opacity: smoothMouse.opacity,
        scale: smoothMouse.scale,
      }}
      animate={{
        width: cursorSize,
        height: cursorSize,
      }}
      ref={cursorRef}
    >
      <InnerCursor
        isHoveredOnMenu={isHoveredOnMenu}
        isHoveredOnProjectCardOrGithubLink={isHoveredOnProjectCardOrGithubLink}
        innerDivRef={innerDivRef}
        innerDivScale={innerDivScale}
      />
    </motion.div>
  );
};

const Container = memo(
  ({ target }: { target: React.RefObject<HTMLDivElement> }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      (async () => {
        await wait(4800);

        setIsMounted(true);
      })();
    }, []);

    return isMounted && <Cursor menu={target} />;
  }
);

Container.displayName = "Cursor";

export default Container;
