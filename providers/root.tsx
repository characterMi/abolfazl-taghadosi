"use client";

import { useReduceMotion } from "@/hooks/use-reduce-motion";
import ReactLenis from "lenis/react";
import { useEffect } from "react";

const Root = ({ children }: { children: React.ReactNode }) => {
  const isMotionReduced = useReduceMotion();

  useEffect(() => {
    if (isMotionReduced) {
      window.document.body.style.setProperty("cursor", "auto");
    }

    window.scrollTo({ behavior: "instant", top: 0 });
  }, []);

  return (
    <ReactLenis
      root
      options={{
        syncTouch: true,
        touchMultiplier: 0.8,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default Root;
