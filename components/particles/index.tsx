"use client";

import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { fadeIn } from "@/utils/motion";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Particles } from "./particles";

const ParticlesCanvas = () => {
  const isMotionReduced = useReduceMotion();

  if (isMotionReduced) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed w-full h-d-screen top-0 left-0"
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
    >
      <Canvas camera={{ position: [0, 2, 0] }} className="pointer-events-none">
        <Particles />
      </Canvas>
    </motion.div>
  );
};

export default ParticlesCanvas;
