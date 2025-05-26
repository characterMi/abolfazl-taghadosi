"use client";

import ReactLenis from "lenis/react";

const Root = ({ children }: { children: React.ReactNode }) => (
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

export default Root;
