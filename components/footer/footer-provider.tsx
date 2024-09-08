"use client";

import { useRef } from "react";
import { Curve } from "./curve";

export const FooterProvider = ({ children }: { children: React.ReactNode }) => {
  const footer = useRef<HTMLDivElement>(null);

  return (
    <footer
      className="min-h-[52rem] md:min-h-[28rem] h-screen bg-gradient-to-r from-neutral-950 to-neutral-900 py-6 px-4 sm:p-10 lg:p-[2.5vw] relative z-[1] flex flex-col overflow-hidden"
      ref={footer}
      id="contact"
    >
      <Curve footerRef={footer} />
      {children}
    </footer>
  );
};
