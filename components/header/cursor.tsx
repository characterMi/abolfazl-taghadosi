"use client";

import WaveEffect from "@/components/shared/wave-effect";
import { useCustomCursorAnimation } from "@/hooks/use-custom-cursor-animation";
import { wait } from "@/lib";
import { motion, MotionValue } from "framer-motion";
import { memo, RefObject, useEffect, useState } from "react";
import ArrowIcon from "../shared/arrow-icon";

const InnerCursor = ({
  isHoveredOnMenu,
  isHoveredOnProject,
  innerDivRef,
  innerDivScale,
}: {
  isHoveredOnMenu: boolean;
  isHoveredOnProject: boolean;
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
        <WaveEffect shouldAnimate={isHoveredOnMenu || isHoveredOnProject} />
      </motion.div>

      <motion.div
        className="pointer-events-none z-[1] flex items-center gap-[0.1vw]"
        initial={{ scale: 0 }}
        animate={isHoveredOnProject ? { scale: 0.8 } : {}}
        transition={{ delay: 0.15 }}
      >
        <span>VIEW</span>
        <ArrowIcon mode="dark" className="size-[0.35vw]" />
      </motion.div>
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
    isHoveredOnProject,
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
        isHoveredOnProject={isHoveredOnProject}
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
