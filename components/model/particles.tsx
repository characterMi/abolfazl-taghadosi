import { fragmentShader, vertexShader } from "@/constants";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useLenis } from "lenis/react";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type ContainerRef = THREE.Points & {
  material: { uniforms: { uTime: { value: number } } };
};

const ParticleMaterial = shaderMaterial(
  {
    uTime: 0,
    uAlphaMap: null,
    uColor: new THREE.Color("#b6edff"),
    uSize: 0.05,
  },
  vertexShader,
  fragmentShader
);

extend({ ParticleMaterial });

export const Particles = ({ count = 500 }: { count?: number }) => {
  const particlesAnimation = useRef({
    isInZoomInSection: false,
    positionY: 0,
    positionZ: 0,
  });
  const pointsRef = useRef<ContainerRef>(null);
  const lenis = useLenis()!;
  const texture = useTexture("/images/1.png");

  const { positions, randomness } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const randomness = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7;
      randomness[i] = (Math.random() - 0.5) * 10;
    }

    return { positions, randomness };
  }, [count]);

  useEffect(() => {
    const zoomInSection =
      document.querySelector<HTMLDivElement>("#zoom-in-animation")!;

    function handleScroll() {
      const zoomInSectionOffsetTop = zoomInSection.offsetTop;

      const lenisProgress =
        lenis.scroll / (zoomInSectionOffsetTop - window.innerHeight);

      if (lenisProgress >= 1) {
        const scrollOffset =
          (lenis.scroll - zoomInSectionOffsetTop) / zoomInSection.offsetHeight;

        particlesAnimation.current.isInZoomInSection = true;
        particlesAnimation.current.positionY = scrollOffset;
      } else {
        const scrollOffset = lenis.scroll / zoomInSectionOffsetTop;
        particlesAnimation.current.isInZoomInSection = false;
        particlesAnimation.current.positionZ = scrollOffset;
      }
    }

    lenis?.on("scroll", handleScroll);

    return () => lenis.off("scroll", handleScroll);
  }, []);

  useFrame(({ clock, invalidate }) => {
    if (!pointsRef.current) return;

    pointsRef.current.material.uniforms.uTime.value = clock.getElapsedTime();

    if (particlesAnimation.current.isInZoomInSection) {
      pointsRef.current.position.setY(particlesAnimation.current.positionY * 3);
    } else {
      pointsRef.current.position.setZ(
        -particlesAnimation.current.positionZ * 2
      );
    }

    invalidate();
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach={"attributes-position"}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach={"attributes-aRandomness"}
          count={randomness.length}
          array={randomness}
          itemSize={1}
        />
      </bufferGeometry>

      {/* @ts-ignore */}
      <particleMaterial transparent uAlphaMap={texture} />
    </points>
  );
};
