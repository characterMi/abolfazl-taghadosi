import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLenis } from "lenis/react";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type ContainerRef = THREE.Points & {
  material: { uniforms: { uTime: { value: number } } };
};

const STARS_COUNT = 500;

export const useParticles = () => {
  const particlesAnimationData = useRef({
    shouldZoomOut: false,
    positionY: 0,
    positionZ: -0.5,
  });
  const pointsRef = useRef<ContainerRef>(null);
  const texture = useTexture("/images/1.png");
  const lenis = useLenis()!;

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

  useEffect(() => {
    const zoomInSection =
      document.querySelector<HTMLDivElement>("#zoom-in-animation")!;

    function handleScroll() {
      const zoomInSectionOffsetTop = zoomInSection.offsetTop;

      const lenisProgress = lenis.scroll / zoomInSectionOffsetTop;

      if (lenisProgress >= 1) {
        const scrollOffset =
          (lenis.scroll - zoomInSectionOffsetTop) / zoomInSection.offsetHeight;

        particlesAnimationData.current.shouldZoomOut = true;
        particlesAnimationData.current.positionY = scrollOffset;
      } else {
        const scrollOffset =
          lenis.scroll / (zoomInSectionOffsetTop - window.innerHeight);
        particlesAnimationData.current.shouldZoomOut = false;
        particlesAnimationData.current.positionZ = scrollOffset - 0.5;
      }
    }

    lenis?.on("scroll", handleScroll);

    return () => lenis?.off("scroll", handleScroll);
  }, [lenis]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    pointsRef.current.material.uniforms.uTime.value = clock.getElapsedTime();

    const { positionY, positionZ, shouldZoomOut } =
      particlesAnimationData.current;
    if (shouldZoomOut) {
      pointsRef.current.position.setY(-positionY * 6);
    } else {
      pointsRef.current.position.setZ(-positionZ * 4);
    }
  });

  return {
    pointsRef,
    positions,
    sizes,
    texture,
  };
};
