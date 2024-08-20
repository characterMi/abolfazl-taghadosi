export const ease = [0.33, 1, 0.68, 1];

export const screenVariant = {
  initial: {
    height: "100vh",
  },
  animate: {
    height: "0vh",
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
