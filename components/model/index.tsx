"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Particles } from "./particles";

const ModelCanvas = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        frameloop="demand"
        camera={{ position: [0, 2, 0] }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        className="touch-none"
        shadows
      >
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelCanvas;
