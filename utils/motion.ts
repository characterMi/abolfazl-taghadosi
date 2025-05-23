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

export const menuContainerSlide = {
  initial: {
    x: "400px",
  },
  enter: {
    x: "0px",
    transition: {
      duration: 0.8,
      ease: menuEasing,
    },
  },
  exit: {
    x: "400px",
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
export const ease2 = [0.87, 0, 0.13, 1];

export type SlideUpVariant =
  | {
      animate: Transition;
      exit?: Transition;
    }
  | undefined;

export const slideUp = {
  initial: { opacity: 0, y: "100%" },
  animate: (transition: SlideUpVariant) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      type: "tween",
      ease,
      ...transition?.animate,
    },
  }),
  exit: (transition: SlideUpVariant) => ({
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 1.5,
      type: "tween",
      ease,
      ...transition?.exit,
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
  initial: {
    opacity: 0,
    filter: "blur(5px)",
    WebkitFilter: "blur(5px)",
    transform: "scale(0.975)",
  },
  animate: (transition: Transition) => ({
    opacity: 1,
    filter: "blur(0px)",
    WebkitFilter: "blur(0px)",
    transform: "scale(1)",
    transition: { duration: 1, ...transition },
  }),
  exit: (transition: Transition) => ({
    opacity: 0,
    filter: "blur(5px)",
    WebkitFilter: "blur(5px)",
    transform: "scale(1.025)",
    transition: { duration: 1, ...transition },
  }),
};

export const waveAnimationVariants = {
  initial: {
    top: "auto",
    height: "0",
    width: "100%",
    bottom: "0",
  },
  animate: {
    top: "auto",
    height: "100%",
    width: "125%",
    bottom: "0",
    transition: {
      duration: 0.4,
      ease,
    },
  },
  exit: {
    top: "0",
    height: "0",
    width: "100%",
    bottom: "auto",
    transition: {
      duration: 0.25,
      ease,
    },
  },
};
