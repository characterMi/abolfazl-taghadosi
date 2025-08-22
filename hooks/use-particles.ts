import { useLenis } from "lenis/react";
import { Geometry, Mesh, Transform } from "ogl";
import { useEffect, useRef } from "react";

import {
  generateParticleData,
  initCamera,
  initProgram,
  initRenderer,
  onLenisScroll,
  updateScene,
} from "@/lib";

export const useParticles = () => {
  const lenis = useLenis()!;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = initRenderer(canvasRef.current);

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const camera = initCamera(gl);

    const scene = new Transform();

    const { positions, sizes } = generateParticleData();

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions, count: positions.length / 3 },
      size: { size: 1, data: sizes, count: sizes.length },
    });

    const program = initProgram(gl);

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });
    particles.setParent(scene);

    const updateFrame = () => {
      updateScene(program, particles, () => renderer.render({ scene, camera }));

      requestAnimationFrame(updateFrame);
    };

    requestAnimationFrame(updateFrame);

    const handleScroll = () =>
      onLenisScroll(
        lenis,
        document.querySelector<HTMLDivElement>("#zoom-in-animation")!
      );

    const handleResize = () => {
      renderer.width = window.innerWidth;
      renderer.height = window.innerHeight;
    };

    lenis.on("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      lenis.off("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return canvasRef;
};
