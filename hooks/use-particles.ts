import { useLenis } from "@/providers/root";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type ContainerRef = THREE.Points & {
  material: { uniforms: { uTime: { value: number } } };
};

const STARS_COUNT = 500;

const useParticlesAnimation = () => {
  const particlesAnimationData = useRef({
    isInZoomInSection: false,
    positionY: 0,
    positionZ: -0.5,
  });
  const lenis = useLenis()!;

  useEffect(() => {
    const zoomInSection =
      document.querySelector<HTMLDivElement>("#zoom-in-animation")!;

    function handleScroll() {
      const zoomInSectionOffsetTop = zoomInSection.offsetTop;

      const lenisProgress = lenis.scroll / zoomInSectionOffsetTop;

      if (lenisProgress >= 1) {
        const scrollOffset =
          (lenis.scroll - zoomInSectionOffsetTop) / zoomInSection.offsetHeight;

        particlesAnimationData.current.isInZoomInSection = true;
        particlesAnimationData.current.positionY = scrollOffset;
      } else {
        const scrollOffset =
          lenis.scroll / (zoomInSectionOffsetTop - window.innerHeight);
        particlesAnimationData.current.isInZoomInSection = false;
        particlesAnimationData.current.positionZ = scrollOffset - 0.5;
      }
    }

    lenis?.on("scroll", handleScroll);

    return () => lenis?.off("scroll", handleScroll);
  }, [lenis]);

  return {
    shouldZoom: particlesAnimationData.current.isInZoomInSection,
    y: particlesAnimationData.current.positionY,
    z: particlesAnimationData.current.positionZ,
  };
};

export const useParticles = () => {
  const pointsRef = useRef<ContainerRef>(null);
  const texture = useTexture("/images/1.png");
  const { shouldZoom, y, z } = useParticlesAnimation();

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(STARS_COUNT * 3);
    const sizes = new Float32Array(STARS_COUNT);

    for (let i = 0; i < STARS_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7;

      sizes[i] = Math.random() * 20;
    }

    return { positions, sizes };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    pointsRef.current.material.uniforms.uTime.value = clock.getElapsedTime();

    if (shouldZoom) {
      pointsRef.current.position.setY(y * 6);
    } else {
      pointsRef.current.position.setZ(z * 4);
    }
  });

  return {
    pointsRef,
    positions,
    sizes,
    texture,
  };
};
