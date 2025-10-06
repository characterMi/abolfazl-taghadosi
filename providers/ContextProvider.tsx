"use client";

import { createContext, useEffect, useState } from "react";

export const IsTouchDeviceContext = createContext(false);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const handleTouchStart = () => setIsTouchDevice(true);

    window.addEventListener("touchstart", handleTouchStart, { once: true });

    return () => window.removeEventListener("touchstart", handleTouchStart);
  }, []);

  return (
    <IsTouchDeviceContext.Provider value={isTouchDevice}>
      {children}
    </IsTouchDeviceContext.Provider>
  );
};

export default ContextProvider;
