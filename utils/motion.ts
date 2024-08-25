import { Transition } from "framer-motion";

type TextVariant = {
  padding: string;
  delay: number;
};

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
      duration: 1,
      type: "tween",
      ease,
      ...transition,
    },
  }),
};

export const scaleUp = {
  hidden: { scale: 0 },
  visible: (delay: number) => ({
    scale: 1,
    transition: {
      delay,
      duration: 0.5,
      type: "tween",
      ease,
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
