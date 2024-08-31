import { useEffect, useState } from "react";

export const useIsTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const handleTouchStart = () => setIsTouchDevice(true);

    window.addEventListener("touchstart", handleTouchStart, { once: true });

    return () => window.removeEventListener("touchstart", handleTouchStart);
  }, []);

  return isTouchDevice;
};
