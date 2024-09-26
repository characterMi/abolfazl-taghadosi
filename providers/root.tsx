"use client";

import { wait } from "@/lib";
import { ReactLenis } from "lenis/react";
import { useLayoutEffect } from "react";

const Root = ({ children }: { children: React.ReactNode }) => {
  useLayoutEffect(() => {
    (async () => {
      await wait(4800);

      window.document.body.style.setProperty("cursor", "auto");
    })();
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
