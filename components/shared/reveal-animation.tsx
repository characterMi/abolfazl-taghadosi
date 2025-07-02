import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { motion, MotionValue, useTransform } from "framer-motion";

type Props = {
  d: string;
  range: number[];
  progress: MotionValue<number>;
};

const RevealAnimation = ({ d, progress, range }: Props) => {
  const shouldReduceMotion = useReduceMotion();
  const opacity = useTransform(progress, range, [0, 1]);

  return <motion.path d={d} opacity={shouldReduceMotion ? 1 : opacity} />;
};

export default RevealAnimation;
