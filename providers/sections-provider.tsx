"use client";

import Magnetic from "@/components/shared/magnetic";
import WaveEffect from "@/components/shared/wave-effect";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import dynamic from "next/dynamic";
import { RefObject, useRef, useState } from "react";

const Sidebar = dynamic(() => import("@/components/shared/sidebar"));
const Cursor = dynamic(() => import("@/components/shared/cursor"), {
  ssr: false,
});

const Header = ({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isTouchDevice = useIsTouchDevice();
  const [isActive, setIsActive] = useState(false);

  const menuScale = useMotionValue(0);
  const smoothMenuScale = useSpring(menuScale, {
    stiffness: 100,
    mass: 0.8,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0) {
      menuScale.set(1);
    } else {
      !isActive && menuScale.set(0);
    }
  });

  return (
    <>
      <header
        className={`menu-container ${isTouchDevice && "mobile-menu-container"}`}
      >
        <div />

        <Magnetic>
          <motion.div
            style={{
              scale: smoothMenuScale,
            }}
            className={`menu ${isTouchDevice && "mobile-menu"} ${
              isActive && "menu-active"
            }`}
            onClick={() => setIsActive((prev) => !prev)}
          >
            {isTouchDevice && <WaveEffect condition={isActive} />}
            <div className="inner-menu" ref={ref} />
          </motion.div>
        </Magnetic>
      </header>

      <AnimatePresence mode="wait">
        {isActive && <Sidebar setIsMenuActive={setIsActive} />}
      </AnimatePresence>

      {!isTouchDevice && <Cursor target={ref} />}
    </>
  );
};

const SectionsProvider = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header containerRef={ref} />
      <section ref={ref}>{children}</section>
    </>
  );
};

export default SectionsProvider;
