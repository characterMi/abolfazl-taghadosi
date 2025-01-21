import { fragmentShader, vertexShader } from "@/constants";
import { useParticles } from "@/hooks/use-particles";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

const ParticleMaterial = shaderMaterial(
  {
    uTime: 0,
    uAlphaMap: null,
    uColor: new THREE.Color("#b6edff"),
    uPixelRatio: null,
  },
  vertexShader,
  fragmentShader
);

extend({ ParticleMaterial });

export const Particles = () => {
  const { pointsRef, positions, sizes, texture } = useParticles();

  return (
    <points ref={pointsRef} position-z={2} position-y={0}>
      <bufferGeometry>
        <bufferAttribute
          attach={"attributes-position"}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach={"attributes-size"}
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>

      {/* @ts-ignore */}
      <particleMaterial
        transparent
        uAlphaMap={texture}
        uPixelRatio={Math.min(window.devicePixelRatio || 1, 2)}
      />
    </points>
  );
};
