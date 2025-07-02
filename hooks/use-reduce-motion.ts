import { useReducedMotion as useReducedMotionFromFramer } from "framer-motion";

export const useReduceMotion = () => {
  const userSetting = useReducedMotionFromFramer();
  const browserSetting = localStorage.getItem("reduce-motion");

  return !!browserSetting || userSetting || false;
};
