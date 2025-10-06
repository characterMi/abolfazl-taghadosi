import { useSpring } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { useIsTouchDevice } from "./use-is-touch-device";

export function useMainProjectsAnimation() {
  const lenis = useLenis();
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const lockTimer = useRef<NodeJS.Timeout>();
  const isLocked = useRef(false);
  const isTouchDevice = useIsTouchDevice();

  const smoothModalOptions = { damping: 20, stiffness: 200, mass: 0.5 };
  const modal = {
    x: useSpring(0, smoothModalOptions),
    y: useSpring(0, smoothModalOptions),
    scale: useSpring(0, smoothModalOptions),
  };

  useEffect(() => {
    const projectsContainerRefCurrent = projectsContainerRef.current;

    if (!projectsContainerRefCurrent) return;

    function handleSetModalPosition(clientX: number, clientY: number) {
      const { innerWidth } = window;
      // we set the modal size to 25vw on desktop and 50vw on mobile as we did in css styles
      const modalSize = innerWidth > 767 ? innerWidth / 4 : innerWidth / 2;

      modal.x.set(clientX - modalSize / 2);
      modal.y.set(clientY - modalSize / 2);
    }

    function handleTouchMove(e: TouchEvent) {
      const touch = e.touches[0];

      handleSetModalPosition(touch.clientX, touch.clientY);
      lenis?.stop();

      clearTimeout(lockTimer.current);
      lockTimer.current = setTimeout(() => {
        navigator.vibrate?.(50);
        isLocked.current = true;
      }, 500);
    }

    function handleMouseMove(e: MouseEvent) {
      handleSetModalPosition(e.clientX, e.clientY);
    }

    function handlePointerEnter(e: TouchEvent | MouseEvent | Touch) {
      e = e instanceof TouchEvent ? e.touches[0] : e;

      handleSetModalPosition(e.clientX, e.clientY);
      modal.scale.set(1);
    }

    function handlePointerLeave() {
      lenis?.start();
      clearTimeout(lockTimer.current);
      if (!isLocked.current) modal.scale.set(0);
    }

    function handlePointerDown() {
      isLocked.current = false;
      if (isTouchDevice) {
        modal.scale.set(0);
      }
    }

    if (isTouchDevice) {
      projectsContainerRefCurrent.addEventListener(
        "touchstart",
        handlePointerEnter
      );
      projectsContainerRefCurrent.addEventListener(
        "touchmove",
        handleTouchMove
      );
      projectsContainerRefCurrent.addEventListener(
        "touchend",
        handlePointerLeave
      );
    } else {
      projectsContainerRefCurrent.addEventListener(
        "mouseenter",
        handlePointerEnter
      );
      projectsContainerRefCurrent.addEventListener(
        "mousemove",
        handleMouseMove
      );
      projectsContainerRefCurrent.addEventListener(
        "mouseleave",
        handlePointerLeave
      );
    }

    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      projectsContainerRefCurrent.removeEventListener(
        "touchstart",
        handlePointerEnter
      );
      projectsContainerRefCurrent.removeEventListener(
        "touchmove",
        handleTouchMove
      );
      projectsContainerRefCurrent.removeEventListener(
        "touchend",
        handlePointerLeave
      );

      projectsContainerRefCurrent.removeEventListener(
        "mouseenter",
        handlePointerEnter
      );
      projectsContainerRefCurrent.removeEventListener(
        "mousemove",
        handleMouseMove
      );
      projectsContainerRefCurrent.removeEventListener(
        "mouseleave",
        handlePointerLeave
      );

      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isTouchDevice]);

  return { modal, projectsContainerRef };
}
