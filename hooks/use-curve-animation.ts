import { lerp } from "@/lib";
import { PointerEvent, RefObject, useEffect, useRef } from "react";
import { useIsTouchDevice } from "./use-is-touch-device";

export function useCurveAnimation(
  card: RefObject<HTMLAnchorElement>,
  isContainerInView: boolean
) {
  const ref = useRef<SVGPathElement>(null);
  const isTouchDevice = useIsTouchDevice();
  let progress = 0;
  let time = Math.PI / 2;
  let reqId: number | null = null;
  let x = 0.5;

  function setPath(progress: number) {
    if (!card.current || !ref.current) return;

    const { width } = card.current.getBoundingClientRect();

    const path = `M0 50 Q${width * x} ${50 + progress}, ${width} 50`;

    ref.current.setAttributeNS("", "d", path);
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const { movementY, clientX } = e;
    const cliRect = ref.current.getBoundingClientRect();
    x = (clientX - cliRect.left) / cliRect.width;
    progress += isTouchDevice ? movementY * 0.075 : movementY;
    setPath(progress);
  }

  function handleMPointerEnter() {
    if (reqId) {
      window.cancelAnimationFrame(reqId);
      resetAnimation();
    }
  }

  function handlePointerLeave() {
    const newProgress = progress * Math.sin(time);
    time += 0.2;
    setPath(newProgress);
    progress = lerp(progress, 0, 0.025);

    if (Math.abs(progress) > 0.75) {
      reqId = window.requestAnimationFrame(handlePointerLeave);
    } else {
      resetAnimation();
    }
  }

  function resetAnimation() {
    time = Math.PI / 2;
    progress = 0;
  }

  useEffect(() => {
    function handleResize() {
      setPath(progress);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isContainerInView) return;

    setPath(progress);
  }, [isContainerInView]);

  return {
    ref,
    handlePointerMove,
    handleMPointerEnter,
    handlePointerLeave,
  };
}
