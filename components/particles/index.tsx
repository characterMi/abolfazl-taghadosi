"use client";

import { fadeIn } from "@/utils/motion";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Particles } from "./particles";

const ParticlesCanvas = () => {
  return (
    <motion.div
      className="fixed inset-0"
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
    >
      <Canvas
        camera={{ position: [0, 2, 0] }}
        className="touch-none pointer-events-none"
      >
        <Particles />
      </Canvas>
    </motion.div>
  );
};

export default ParticlesCanvas;
