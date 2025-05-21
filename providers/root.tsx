"use client";

import { wait } from "@/lib";
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

    lenisInstance.stop();

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    (async () => {
      await wait(4800);

      window.document.body.style.setProperty("cursor", "auto");
      lenisInstance.start();
    })();
  }, []);

  return <Context.Provider value={{ lenis }}>{children}</Context.Provider>;
};

export default Root;
