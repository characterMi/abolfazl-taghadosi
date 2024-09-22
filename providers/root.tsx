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
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default Root;
