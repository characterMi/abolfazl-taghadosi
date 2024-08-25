"use client";

import { fadeIn } from "@/utils/motion";
import { motion, MotionValue, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const InnerCursor = ({ cursorScale }: { cursorScale: MotionValue<number> }) => {
  const [isHoveredOnProjectCard, setIsHoveredOnProjectCard] = useState(false);

  useEffect(() => {
    const projectCards =
      document.querySelectorAll<HTMLAnchorElement>(".project-card");

    function handleMouseEntersProjectCard() {
      cursorScale.set(4);
      setIsHoveredOnProjectCard(true);
    }

    function handleMouseLeavesProjectCard() {
      cursorScale.set(1);
      setIsHoveredOnProjectCard(false);
    }

    projectCards.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEntersProjectCard);
      element.addEventListener("mouseleave", handleMouseLeavesProjectCard);
    });

    return () => {
      projectCards.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEntersProjectCard);
        element.removeEventListener("mouseleave", handleMouseLeavesProjectCard);
      });
    };
  }, []);

  return (
    <>
      <span
        className="h-0 top-0 bg-pink absolute rounded-[50%] duration-500"
        style={{
          top: isHoveredOnProjectCard ? "auto" : "0",
          height: isHoveredOnProjectCard ? "200%" : "0",
          width: isHoveredOnProjectCard ? "150%" : "125%",
          bottom: isHoveredOnProjectCard ? "0" : "auto",
        }}
      />
      {"VIEW".split("").map((letter, i) => (
        <motion.span
          className="pointer-events-none z-[1]"
          key={letter}
          variants={fadeIn}
          custom={{ delay: (i + 1) * 0.1, duration: 0.3 }}
          initial="initial"
          animate={isHoveredOnProjectCard ? "animate" : ""}
          exit="animate"
        >
          {letter}
        </motion.span>
      ))}
    </>
  );
};

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorSize = 30;
  const smoothMouseOptions = { damping: 20, stiffness: 300, mass: 0.5 };

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
    opacity: useMotionValue(0),
    scale: useMotionValue(1),
  };

  const smoothMouse = {
    x: useSpring(mouse.x, smoothMouseOptions),
    y: useSpring(mouse.y, smoothMouseOptions),
    opacity: useSpring(mouse.opacity, smoothMouseOptions),
    scale: useSpring(mouse.scale, smoothMouseOptions),
  };

  const handleMouseMove = (e: MouseEvent) => {
    mouse.opacity.set(1);
    const { clientX, clientY } = e;

    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  };

  const handleRemoveOpacity = () => mouse.opacity.set(0);

  const handleSetOpacity = () => mouse.opacity.set(1);

  const handleMouseOver = () => mouse.scale.set(0.7);

  const handleMouseLeave = () => mouse.scale.set(1);

  useEffect(() => {
    const links = document.querySelectorAll(".link");

    window.addEventListener("mousemove", handleMouseMove);
    window.document.addEventListener("mouseenter", handleSetOpacity);
    window.document.addEventListener("mouseleave", handleRemoveOpacity);
    links.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.document.removeEventListener("mouseenter", handleSetOpacity);
      window.document.removeEventListener("mouseleave", handleRemoveOpacity);
      links.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="bg-transparent border border-pink size-10 rounded-full fixed pointer-events-none z-10 flex justify-center items-center text-[6px] overflow-hidden"
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
        opacity: smoothMouse.opacity,
        scale: smoothMouse.scale,
      }}
      animate={{
        width: cursorSize,
        height: cursorSize,
      }}
      ref={cursorRef}
    >
      <InnerCursor cursorScale={mouse.scale} />
    </motion.div>
  );
};

const CursorContainer = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 5000);

    const handleTouchStart = () => setIsTouchDevice(true);

    window.addEventListener("touchstart", handleTouchStart);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return !isTouchDevice && isMounted && <Cursor />;
};

export default CursorContainer;
