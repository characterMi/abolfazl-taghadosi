/**
 * I know this hook looks like a mess, and tbh it is, but honestly in most of lines we're just adding event listeners to the window, document, and different dom elements.
 */

import { animate, transform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function useCustomCursorAnimation(
  menuRef: React.RefObject<HTMLDivElement>
) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerDivRef = useRef<HTMLDivElement>(null);
  const [isHoveredOnMenu, setIsHoveredOnMenu] = useState(false);
  const [isHoveredOnProject, setIsHoveredOnProject] = useState(false);

  // The reason that we're using '2.5' is because we want the cursor to have a {{ 2.5vw }} width and height
  const cursorSize = isHoveredOnMenu
    ? menuRef.current?.parentElement?.getBoundingClientRect().width!
    : (window.innerWidth / 100) * 2.5;

  const smoothMouseOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(0, smoothMouseOptions),
    y: useSpring(0, smoothMouseOptions),
    opacity: useSpring(0, smoothMouseOptions),
    scale: useSpring(1, smoothMouseOptions),
  };

  const innerDivScale = {
    x: useMotionValue(1),
    y: useMotionValue(1),
  };

  useEffect(() => {
    const controller = new AbortController();
    const links = document.querySelectorAll(".link");
    const projectCards =
      document.querySelectorAll<HTMLAnchorElement>(".project-card");
    const menuRefCurrent = menuRef.current;

    // Function definition...
    const handleRemoveOpacity = () => smoothMouse.opacity.set(0);

    const handleSetOpacity = () => smoothMouse.opacity.set(1);

    const handleMouseOverOnLinks = () => smoothMouse.scale.set(0.5);

    const handleMouseLeaveLinks = () => smoothMouse.scale.set(1);

    const handleMouseOverOnMenu = () => setIsHoveredOnMenu(true);

    const handleMouseLeaveMenu = () => {
      if (!innerDivRef.current) return;

      animate(
        innerDivRef.current,
        { scaleX: 1, scaleY: 1 },
        { duration: 0.1, type: "spring" }
      );

      setIsHoveredOnMenu(false);
    };

    function handleMouseEntersProjectCard() {
      smoothMouse.scale.set(3);
      setIsHoveredOnProject(true);
    }

    function handleMouseLeavesProjectCard() {
      smoothMouse.scale.set(1);
      setIsHoveredOnProject(false);
    }

    window.document.addEventListener("mouseenter", handleSetOpacity, {
      signal: controller.signal,
    });
    window.document.addEventListener("mouseleave", handleRemoveOpacity, {
      signal: controller.signal,
    });
    menuRefCurrent?.addEventListener("mouseover", handleMouseOverOnMenu, {
      signal: controller.signal,
    });
    menuRefCurrent?.addEventListener("mouseleave", handleMouseLeaveMenu, {
      signal: controller.signal,
    });
    links.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOverOnLinks, {
        signal: controller.signal,
      });
      element.addEventListener("mouseleave", handleMouseLeaveLinks, {
        signal: controller.signal,
      });
    });
    projectCards.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEntersProjectCard, {
        signal: controller.signal,
      });
      element.addEventListener("mouseleave", handleMouseLeavesProjectCard, {
        signal: controller.signal,
      });
    });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    // Function definition...

    const rotate = (distance: { x: number; y: number }) => {
      if (!innerDivRef.current) return;

      // Math.atan2() will give us a rad angle if we specify the x and y axis
      const angle = Math.atan2(distance.y, distance.x);

      // we animate the cursor using the given angle
      animate(innerDivRef.current, { rotate: `${angle}rad` }, { duration: 0 });
    };

    const handleSetScale = ({
      distance,
      center,
      width,
      height,
      clientX,
      clientY,
    }: {
      distance: { x: number; y: number };
      center: typeof distance;
      width: number;
      height: number;
      clientX: number;
      clientY: number;
    }) => {
      if (!isHoveredOnMenu) {
        smoothMouse.x.set(clientX - cursorSize / 2);
        smoothMouse.y.set(clientY - cursorSize / 2);
        return;
      }

      const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y));
      const newScaleX = transform(absDistance, [0, width / 2], [1, 1.3]);
      const newScaleY = transform(absDistance, [0, height / 2], [1, 0.8]);

      innerDivScale.x.set(newScaleX);
      innerDivScale.y.set(newScaleY);

      smoothMouse.x.set(center.x - cursorSize / 2 + distance.x * 0.1);
      smoothMouse.y.set(center.y - cursorSize / 2 + distance.y * 0.1);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!menuRef.current) return;

      smoothMouse.opacity.set(1);
      const { clientX, clientY } = e;
      const { top, left, width, height } =
        menuRef.current.getBoundingClientRect();

      // calculating the center of the target element which is the Burger menu.
      const center = { x: left + width / 2, y: top + height / 2 };

      // calculating the distance of the cursor and use it while hovering on the Burger menu.
      const distance = { x: clientX - center.x, y: clientY - center.y };

      if (isHoveredOnMenu) rotate(distance);

      handleSetScale({ distance, center, width, height, clientX, clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHoveredOnMenu]);

  return {
    cursorRef,
    innerDivRef,
    cursorSize,
    smoothMouse,
    innerDivScale,
    isHoveredOnMenu,
    isHoveredOnProject,
  };
}
