import { motion, MotionValue, useTransform } from "framer-motion";

export const SectionHeading = ({
  title,
  range,
  scrollProgress,
}: {
  title: string;
  range: [number, number];
  scrollProgress: MotionValue<number>;
}) => {
  const scaleX = useTransform(scrollProgress, range, [1, 0]);

  return (
    <p className="text-2xl xss:text-3xl sm:text-5xl lg:text-[3vw] font-semibold mb-6 lg:mb-[1.5vw] text-neutral-900 !leading-tight relative">
      <motion.span
        aria-hidden
        style={{
          scaleX,
          transformOrigin: "left",
        }}
        className="size-full absolute bg-gradient-to-r from-white from-50% to-transparent"
      />
      {title}
    </p>
  );
};
