"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext({
  lenis: undefined as Lenis | undefined,
});

export const useLenis = () => useContext(Context)["lenis"];

const Root = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | undefined>();

  useEffect(() => {
    const lenisInstance = new Lenis({
      syncTouch: true,
      touchMultiplier: 0.8,
    });

    setLenis(lenisInstance);

    window.scrollTo(0, 0);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return <Context.Provider value={{ lenis }}>{children}</Context.Provider>;
};

export default Root;
