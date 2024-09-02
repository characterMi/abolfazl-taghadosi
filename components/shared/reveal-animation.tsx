import { motion, MotionValue, useTransform } from "framer-motion";

type Props = {
  d: string;
  range: number[];
  progress: MotionValue<number>;
};

const RevealAnimation = ({ d, progress, range }: Props) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return <motion.path d={d} opacity={opacity} />;
};

export default RevealAnimation;
