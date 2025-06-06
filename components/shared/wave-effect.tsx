import { waveAnimationVariants } from "@/utils/motion";
import { AnimatePresence, motion } from "framer-motion";

const WaveEffect = ({ shouldAnimate }: { shouldAnimate: boolean }) => (
  <AnimatePresence mode="wait">
    {shouldAnimate && (
      <motion.span
        className="absolute rounded-[50%]"
        style={{
          background: "radial-gradient(circle, #56ccf2, #32a2c7 75%)",
        }}
        variants={waveAnimationVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        aria-hidden
      />
    )}
  </AnimatePresence>
);

export default WaveEffect;
