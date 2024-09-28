"use client";

import Magnetic from "@/components/shared/magnetic";
import WaveEffect from "@/components/shared/wave-effect";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { wait } from "@/lib";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import dynamic from "next/dynamic";
import { useLayoutEffect, useRef, useState } from "react";

const Sidebar = dynamic(() => import("@/components/shared/sidebar"));
const Cursor = dynamic(() => import("@/components/shared/cursor"), {
  ssr: false,
});

const Header = ({ menuScale }: { menuScale: MotionValue<number> }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isTouchDevice = useIsTouchDevice();
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <header
        className={`menu-container ${isTouchDevice && "mobile-menu-container"}`}
      >
        <div />

        <Magnetic>
          <motion.div
            style={{
              scale: isActive ? 1 : 0 || menuScale,
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
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const menuScale = useSpring(0, { mass: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isPageLoaded) return;

    if (latest > 0) {
      menuScale.set(1);
    } else {
      menuScale.set(0);
    }
  });

  useLayoutEffect(() => {
    (async () => {
      await wait(4800);

      setIsPageLoaded(true);
    })();
  }, []);

  return (
    <>
      {isPageLoaded && <Header menuScale={menuScale} />}
      <section ref={ref}>{isPageLoaded && children}</section>
    </>
  );
};

export default SectionsProvider;
