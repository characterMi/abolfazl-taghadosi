"use client";

import { wait } from "@/lib";
import { fadeInWithBlur } from "@/utils/motion";
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

let timeoutId: NodeJS.Timeout | null = null;

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
  const [
    isHoveredOnProjectCardOrGithubLink,
    setIsHoveredOnProjectCardOrGithubLink,
  ] = useState(false);

  useEffect(() => {
    const projectCards =
      document.querySelectorAll<HTMLAnchorElement>(".project-card");
    const githubLinks =
      document.querySelectorAll<HTMLAnchorElement>(".github-link");

    function handleMouseEntersProjectCard() {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      cursorScale.set(3);
      setIsHoveredOnProjectCardOrGithubLink(true);
    }

    function handleMouseLeavesProjectCard() {
      cursorScale.set(1);
      timeoutId = setTimeout(() => {
        setIsHoveredOnProjectCardOrGithubLink(false);
      }, 400);
    }

    projectCards.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEntersProjectCard);
      element.addEventListener("mouseleave", handleMouseLeavesProjectCard);
    });

    githubLinks.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEntersProjectCard);
      element.addEventListener("mouseleave", handleMouseLeavesProjectCard);
    });

    return () => {
      projectCards.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEntersProjectCard);
        element.removeEventListener("mouseleave", handleMouseLeavesProjectCard);
      });

      githubLinks.forEach((element) => {
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
        className="absolute top-0 left-0 w-full h-full rounded-full overflow-hidden flex items-center justify-center border border-primary"
        style={{
          scaleX: innerCursorScale.x,
          scaleY: innerCursorScale.y,
        }}
        ref={innerCursorRef}
      >
        <WaveEffect
          condition={isHoveredOnMenu || isHoveredOnProjectCardOrGithubLink}
        />
      </motion.div>

      {"VIEW".split("").map((letter, i) => (
        <motion.span
          className="pointer-events-none z-[1]"
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
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerCursorRef = useRef<HTMLDivElement>(null);
  const [isHoveredOnMenu, setIsHoveredOnMenu] = useState(false);

  const smoothMouseOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorSizeWhenHoveringOnMenu =
    menu.current?.parentElement?.getBoundingClientRect().width!;
  // The reason that we're using '2.5' is because we want the cursor to have a {{ 2.5vw }} width and height
  const cursorSize = (window.innerWidth / 100) * 2.5;

  const smoothMouse = {
    x: useSpring(0, smoothMouseOptions),
    y: useSpring(0, smoothMouseOptions),
    opacity: useSpring(0, smoothMouseOptions),
    scale: useSpring(1, smoothMouseOptions),
  };

  const innerCursorScale = {
    x: useMotionValue(1),
    y: useMotionValue(1),
  };

  useEffect(() => {
    const links = document.querySelectorAll(".link");
    const currentTarget = menu.current;

    // Function definition...
    const handleRemoveOpacity = () => smoothMouse.opacity.set(0);

    const handleSetOpacity = () => smoothMouse.opacity.set(1);

    const handleMouseOverOnLinks = () => smoothMouse.scale.set(0.5);

    const handleMouseLeaveLinks = () => smoothMouse.scale.set(1);

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
    currentTarget?.addEventListener("mouseover", handleMouseOverOnMenu);
    currentTarget?.addEventListener("mouseleave", handleMouseLeaveMenu);
    links.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOverOnLinks);
      element.addEventListener("mouseleave", handleMouseLeaveLinks);
    });

    return () => {
      window.document.removeEventListener("mouseenter", handleSetOpacity);
      window.document.removeEventListener("mouseleave", handleRemoveOpacity);
      currentTarget?.removeEventListener("mouseover", handleMouseOverOnMenu);
      currentTarget?.removeEventListener("mouseleave", handleMouseLeaveMenu);
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
      if (!menu.current) return;

      smoothMouse.opacity.set(1);
      const { clientX, clientY } = e;
      const { top, left, width, height } = menu.current.getBoundingClientRect();

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

        smoothMouse.x.set(
          center.x - cursorSizeWhenHoveringOnMenu / 2 + distance.x * 0.1
        );
        smoothMouse.y.set(
          center.y - cursorSizeWhenHoveringOnMenu / 2 + distance.y * 0.1
        );
      } else {
        smoothMouse.x.set(clientX - cursorSize / 2);
        smoothMouse.y.set(clientY - cursorSize / 2);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHoveredOnMenu]);

  return (
    <motion.div
      id="cursor"
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
        cursorScale={smoothMouse.scale}
        isHoveredOnMenu={isHoveredOnMenu}
        innerCursorRef={innerCursorRef}
        innerCursorScale={innerCursorScale}
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
