import { motion, MotionValue, useTransform } from "framer-motion";

export const SlideOutText = ({ scrollY }: { scrollY: MotionValue<number> }) => {
  const translateX = useTransform(scrollY, [0, 1], ["0%", "-10%"]);
  const translateY = useTransform(scrollY, [0, 1], ["0%", "-300%"]);
  const scale = useTransform(scrollY, [0, 1], [1, 2]);

  return (
    <motion.p
      className="title m-4 md:m-10 lg:mt-[2.5vw]"
      style={{
        translateY,
        translateX,
        scale,
      }}
    >
      I use Modern <br />
      <mark className="mark">web technologies</mark>
    </motion.p>
  );
};
