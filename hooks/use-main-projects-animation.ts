import { useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { useIsTouchDevice } from "./use-is-touch-device";

export function useMainProjectsAnimation() {
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const isTouchDevice = useIsTouchDevice();

  const smoothModalOptions = { damping: 20, stiffness: 200, mass: 0.5 };
  const modal = {
    x: useSpring(0, smoothModalOptions),
    y: useSpring(0, smoothModalOptions),
    scale: useSpring(0, smoothModalOptions),
  };

  useEffect(() => {
    function handleSetModalPosition(e: MouseEvent | Touch) {
      const { innerWidth } = window;
      // we set the modal size to 25vw on desktop and 50vw on mobile as we did in css styles
      const modalSize = innerWidth > 767 ? innerWidth / 4 : innerWidth / 2;

      modal.x.set(e.clientX - modalSize / 2);
      modal.y.set(e.clientY - modalSize / 2);
    }

    function handleTouchMove(e: TouchEvent) {
      handleSetModalPosition(e.touches[0]);
    }

    function handleTouchStart(e: TouchEvent) {
      handleSetModalPosition(e.touches[0]);
      modal.scale.set(1);
    }

    function handlePointerLeave() {
      modal.scale.set(0);
    }

    function handleMouseEnter(e: MouseEvent) {
      handleSetModalPosition(e);
      modal.scale.set(1);
    }

    if (isTouchDevice) {
      projectsContainerRef.current?.addEventListener(
        "touchstart",
        handleTouchStart
      );
      projectsContainerRef.current?.addEventListener(
        "touchend",
        handlePointerLeave
      );
      window.addEventListener("touchmove", handleTouchMove);
    } else {
      projectsContainerRef.current?.addEventListener(
        "mouseenter",
        handleMouseEnter
      );
      projectsContainerRef.current?.addEventListener(
        "mouseleave",
        handlePointerLeave
      );
      window.addEventListener("mousemove", handleSetModalPosition);
    }

    return () => {
      if (isTouchDevice) {
        projectsContainerRef.current?.removeEventListener(
          "touchstart",
          handleTouchStart
        );
        projectsContainerRef.current?.removeEventListener(
          "touchend",
          handlePointerLeave
        );
        window.removeEventListener("touchmove", handleTouchMove);
      } else {
        projectsContainerRef.current?.removeEventListener(
          "mouseenter",
          handleMouseEnter
        );
        projectsContainerRef.current?.removeEventListener(
          "mouseleave",
          handlePointerLeave
        );
        window.removeEventListener("mousemove", handleSetModalPosition);
      }
    };
  }, [isTouchDevice]);

  return { modal, projectsContainerRef };
}
