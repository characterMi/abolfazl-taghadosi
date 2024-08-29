"use client";

import Cursor from "@/components/shared/cursor";
import Magnetic from "@/components/shared/magnetic";
import Sidebar from "@/components/shared/sidebar";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { RefObject, useRef, useState } from "react";

const Header = ({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  const menuScale = useMotionValue(0);
  const smoothMenuScale = useSpring(menuScale, {
    damping: 20,
    stiffness: 400,
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
      <div className="menu-container">
        <div />

        <Magnetic>
          <motion.div
            style={{
              scale: smoothMenuScale,
            }}
            className={`menu ${isActive && "menu-active"}`}
            onClick={() => setIsActive((prev) => !prev)}
          >
            <div className="inner-menu" ref={ref} />
          </motion.div>
        </Magnetic>
      </div>

      <AnimatePresence mode="wait">{isActive && <Sidebar />}</AnimatePresence>

      <Cursor target={ref} />
    </>
  );
};

const ComponentsProvider = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header containerRef={ref} />
      <section ref={ref}>{children}</section>
    </>
  );
};

export default ComponentsProvider;
