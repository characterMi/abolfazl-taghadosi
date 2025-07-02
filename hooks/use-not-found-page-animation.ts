import { useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { useIsTouchDevice } from "./use-is-touch-device";
import { useReduceMotion } from "./use-reduce-motion";

export function useNotFoundPageAnimation(
  container: React.RefObject<HTMLDivElement>
) {
  const isMotionReduced = useReduceMotion();
  const isTouchDevice = useIsTouchDevice();
  const tracker = {
    x: useMotionValue("-100%"),
    y: useMotionValue("-100%"),
  };

  useEffect(() => {
    function handlePointerMove(pointerData: MouseEvent | Touch) {
      if (!container.current || isMotionReduced) return;

      const { clientX, clientY } = pointerData;
      const { height, left, top, width } =
        container.current.getBoundingClientRect();

      const percentX = width / 100;
      const percentY = height / 100;

      const x = (clientX - left) / percentX;
      const y = (clientY - top) / percentY;

      tracker.x.set(`${x}%`);
      tracker.y.set(`${y}%`);
    }

    function handleTouchMove(e: TouchEvent) {
      const touch = e.touches[0];

      handlePointerMove(touch);
    }

    if (isTouchDevice) {
      window.addEventListener("touchmove", handleTouchMove);
    } else {
      window.addEventListener("mousemove", handlePointerMove);
    }

    return () => {
      if (isTouchDevice) {
        window.removeEventListener("touchmove", handleTouchMove);
      } else {
        window.removeEventListener("mousemove", handlePointerMove);
      }
    };
  }, [isTouchDevice]);

  return tracker;
}
