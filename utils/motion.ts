import { Transition } from "framer-motion";

// Menu...
const menuEasing = [0.76, 0, 0.24, 1];

export const menuSlide = {
  initial: {
    x: "calc(100% + 100px)",
  },
  enter: {
    x: "0",
    transition: {
      duration: 0.8,
      ease: menuEasing,
    },
  },
  exit: {
    x: "calc(100% + 100px)",
    transition: {
      duration: 0.8,
      ease: menuEasing,
    },
  },
};

export const slide = {
  initial: {
    x: "80px",
  },
  enter: (index: number) => ({
    x: "0px",
    transition: {
      duration: 0.8,
      ease: menuEasing,
      delay: 0.05 * index,
    },
  }),
  exit: (index: number) => ({
    x: "80px",
    transition: {
      duration: 0.8,
      ease: menuEasing,
      delay: 0.05 * index,
    },
  }),
};

export const pathAnimation = (initialPath: string, targetPath: string) => ({
  initial: {
    d: initialPath,
  },
  enter: {
    d: targetPath,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    d: initialPath,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
});

export const ease = [0.33, 1, 0.68, 1];

export const screenVariant = {
  initial: {
    height: "150%",
  },
  animate: {
    height: "0%",
    transition: {
      duration: 1,
      delay: 3,
      type: "tween",
      ease,
    },
  },
};

export const gVariants = {
  initial: {
    translateY: "150%",
  },
  animate: (delay: number) => ({
    translateY: "0%",
    transition: {
      delay: 1 + delay,
      duration: 1,
      type: "tween",
      ease,
    },
  }),
};

export const slideUp = {
  initial: { opacity: 0, y: "100%" },
  animate: (transition: Transition) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      type: "tween",
      ease,
      ...transition,
    },
  }),
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: (transition: Transition) => ({
    opacity: 1,
    transition: { duration: 1, ...transition },
  }),
};

export const fadeInWithBlur = {
  initial: { opacity: 0, filter: "blur(5px)", WebkitFilter: "blue(5px)" },
  animate: (transition: Transition) => ({
    opacity: 1,
    filter: "blur(0px)",
    WebkitFilter: "blue(0px)",
    transition: { duration: 1, ...transition },
  }),
};
