"use client";

import { ReactLenis } from "lenis/react";

const Root = ({ children }: { children: React.ReactNode }) => (
  <ReactLenis root>{children}</ReactLenis>
);

export default Root;
