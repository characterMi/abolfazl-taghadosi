"use client";

import Magnetic from "@/components/shared/magnetic";
import WaveEffect from "@/components/shared/wave-effect";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const Sidebar = dynamic(() => import("./sidebar"));
const Cursor = dynamic(() => import("./cursor"), {
  ssr: false,
});

const Header = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const isTouchDevice = useIsTouchDevice();

  const menuScale = useSpring(0, { mass: 0.2 });

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > window.innerHeight) {
      menuScale.set(1);
    } else {
      menuScale.set(0);
    }
  });

  return (
    <>
      <header
        className={twMerge(
          "fixed top-0 left-0 w-full md:p-5 lg:p-[1.25vw] z-50 flex items-center justify-between mix-blend-difference pointer-events-none",
          isTouchDevice && "mix-blend-normal px-4 py-6"
        )}
      >
        <div aria-hidden />

        <Magnetic>
          <motion.button
            style={{
              scale: isActive ? 1 : 0 || menuScale,
              background: isTouchDevice
                ? "radial-gradient(circle, #b6edff, #56ccf2)"
                : "transparent",
            }}
            className={twMerge(
              "pointer-events-none size-16 lg:size-[5vw] relative rounded-full after:block after:w-[40%] after:bg-white after:absolute after:top-[45%] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:m-auto before:block before:w-[40%] before:bg-white before:absolute before:top-[55%] before:left-1/2 before:-translate-x-1/2 before:h-[2px] before:m-auto after:transition before:transition before:z-[1]",
              isTouchDevice &&
                "bg-primary flex justify-center items-center overflow-hidden mobile-menu",
              isActive &&
                "after:rotate-45 before:-rotate-45 after:top-1/2 before:top-1/2"
            )}
            onClick={() => setIsActive((prev) => !prev)}
            aria-expanded={isActive}
            aria-label="Menu toggle button"
          >
            {isTouchDevice && <WaveEffect shouldAnimate={isActive} />}
            <div
              className="w-full h-full hover:scale-[3] pointer-events-auto"
              ref={ref}
              aria-hidden
            />
          </motion.button>
        </Magnetic>
      </header>

      <AnimatePresence mode="wait">
        {isActive && <Sidebar setIsMenuActive={setIsActive} />}
      </AnimatePresence>

      {!isTouchDevice && <Cursor target={ref} />}
    </>
  );
};

export default Header;
