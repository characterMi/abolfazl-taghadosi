import { fragmentShader, vertexShader } from "@/constants";
import { useLenis } from "@/providers/root";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
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
    uPixelRatio: null,
  },
  vertexShader,
  fragmentShader
);

extend({ ParticleMaterial });

export const Particles = ({
  count = 500,
  notFound,
}: {
  count?: number;
  notFound?: boolean;
}) => {
  const particlesAnimationData = useRef({
    isInZoomInSection: false,
    positionY: notFound ? 0.15 : 0,
    positionZ: notFound ? 0 : -0.5,
  });
  const pointsRef = useRef<ContainerRef>(null);
  const lenis = useLenis()!;
  const texture = useTexture("/images/1.png");

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7;

      sizes[i] = Math.random() * 20;
    }

    return { positions, sizes };
  }, [count]);

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

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    pointsRef.current.material.uniforms.uTime.value = clock.getElapsedTime();

    if (particlesAnimationData.current.isInZoomInSection) {
      pointsRef.current.position.setY(
        particlesAnimationData.current.positionY * 6
      );
    } else {
      pointsRef.current.position.setZ(
        -particlesAnimationData.current.positionZ * 4
      );
    }
  });

  return (
    <points
      ref={pointsRef}
      position-z={notFound ? 0 : 2}
      position-y={notFound ? 0.9 : 0}
    >
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
