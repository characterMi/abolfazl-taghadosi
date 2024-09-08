"use client";

import { fadeIn } from "@/utils/motion";
import {
  animate,
  motion,
  MotionValue,
  transform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { memo, RefObject, useEffect, useRef, useState } from "react";
import WaveEffect from "./wave-effect";

const InnerCursor = ({
  cursorScale,
  isHoveredOnMenu,
  innerCursorRef,
  innerCursorScale,
}: {
  cursorScale: MotionValue<number>;
  innerCursorScale: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  innerCursorRef: RefObject<HTMLDivElement>;
  isHoveredOnMenu: boolean;
}) => {
  const [isHoveredOnProjectCard, setIsHoveredOnProjectCard] = useState(false);

  useEffect(() => {
    const projectCards =
      document.querySelectorAll<HTMLAnchorElement>(".project-card");

    function handleMouseEntersProjectCard() {
      cursorScale.set(3);
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
        className="absolute top-0 left-0 w-full h-full rounded-full overflow-hidden flex items-center justify-center"
        style={{
          scaleX: innerCursorScale.x,
          scaleY: innerCursorScale.y,
          background: "radial-gradient(circle, transparent 65%, #56ccf2 65%)",
        }}
        ref={innerCursorRef}
      >
        <WaveEffect condition={isHoveredOnMenu || isHoveredOnProjectCard} />
      </motion.div>
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

const Cursor = memo(
  ({ target }: { target: React.RefObject<HTMLDivElement> }) => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const innerCursorRef = useRef<HTMLDivElement>(null);
    const [isHoveredOnMenu, setIsHoveredOnMenu] = useState(false);

    const smoothMouseOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const cursorSizeWhenHoveringOnMenu =
      target.current?.parentElement?.getBoundingClientRect().width!;
    // The reason that we're using '2.5' is because we want the cursor to have a {{ 2.5vw }} width and height
    const cursorSize = (window.innerWidth / 100) * 2.5;

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

    const innerCursorScale = {
      x: useMotionValue(1),
      y: useMotionValue(1),
    };

    useEffect(() => {
      const links = document.querySelectorAll(".link");

      // Function definition...
      const handleRemoveOpacity = () => mouse.opacity.set(0);

      const handleSetOpacity = () => mouse.opacity.set(1);

      const handleMouseOverOnLinks = () => mouse.scale.set(0.5);

      const handleMouseLeaveLinks = () => mouse.scale.set(1);

      const handleMouseOverOnMenu = () => setIsHoveredOnMenu(true);

      const handleMouseLeaveMenu = () => {
        if (!innerCursorRef.current) return;

        animate(
          innerCursorRef.current,
          { scaleX: 1, scaleY: 1 },
          { duration: 0.1, type: "spring" }
        );

        setIsHoveredOnMenu(false);
      };

      window.document.addEventListener("mouseenter", handleSetOpacity);
      window.document.addEventListener("mouseleave", handleRemoveOpacity);
      target.current?.addEventListener("mouseover", handleMouseOverOnMenu);
      target.current?.addEventListener("mouseleave", handleMouseLeaveMenu);
      links.forEach((element) => {
        element.addEventListener("mouseover", handleMouseOverOnLinks);
        element.addEventListener("mouseleave", handleMouseLeaveLinks);
      });

      return () => {
        window.document.removeEventListener("mouseenter", handleSetOpacity);
        window.document.removeEventListener("mouseleave", handleRemoveOpacity);
        target.current?.removeEventListener("mouseover", handleMouseOverOnMenu);
        target.current?.removeEventListener("mouseleave", handleMouseLeaveMenu);
        links.forEach((element) => {
          element.removeEventListener("mouseover", handleMouseOverOnLinks);
          element.removeEventListener("mouseleave", handleMouseLeaveLinks);
        });
      };
    }, []);

    useEffect(() => {
      // Function definition...
      const rotate = (distance: { x: number; y: number }) => {
        if (!innerCursorRef.current) return;

        // Math.atan2() will give us a rad angle if we specify the x and y axis
        const angle = Math.atan2(distance.y, distance.x);

        // we animate the cursor using the given angle
        animate(
          innerCursorRef.current,
          { rotate: `${angle}rad` },
          { duration: 0 }
        );
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!target.current) return;

        mouse.opacity.set(1);
        const { clientX, clientY } = e;
        const { top, left, width, height } =
          target.current.getBoundingClientRect();

        // calculating the center of the target element which is the Burger menu.
        const center = { x: left + width / 2, y: top + height / 2 };

        // calculating the distance of the cursor and use it while hovering on the Burger menu.
        const distance = { x: clientX - center.x, y: clientY - center.y };

        if (isHoveredOnMenu) {
          // rotating the cursor if we hovered on the menu.
          rotate(distance);

          const absDistance = Math.max(
            Math.abs(distance.x),
            Math.abs(distance.y)
          );
          const newScaleX = transform(absDistance, [0, width / 2], [1, 1.3]);
          const newScaleY = transform(absDistance, [0, height / 2], [1, 0.8]);

          innerCursorScale.x.set(newScaleX);
          innerCursorScale.y.set(newScaleY);

          mouse.x.set(
            center.x - cursorSizeWhenHoveringOnMenu / 2 + distance.x * 0.1
          );
          mouse.y.set(
            center.y - cursorSizeWhenHoveringOnMenu / 2 + distance.y * 0.1
          );
        } else {
          mouse.x.set(clientX - cursorSize / 2);
          mouse.y.set(clientY - cursorSize / 2);
        }
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, [isHoveredOnMenu]);

    return (
      <motion.div
        className="size-[2.5vw] rounded-full fixed pointer-events-none z-[49] text-[0.5vw] flex items-center justify-center"
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
          opacity: smoothMouse.opacity,
          scale: smoothMouse.scale,
        }}
        animate={{
          width: isHoveredOnMenu ? cursorSizeWhenHoveringOnMenu : cursorSize,
          height: isHoveredOnMenu ? cursorSizeWhenHoveringOnMenu : cursorSize,
        }}
        ref={cursorRef}
      >
        <InnerCursor
          cursorScale={mouse.scale}
          isHoveredOnMenu={isHoveredOnMenu}
          innerCursorRef={innerCursorRef}
          innerCursorScale={innerCursorScale}
        />
      </motion.div>
    );
  }
);

Cursor.displayName = "CustomCursor";

export default Cursor;
