import { fragmentShader, vertexShader } from "@/constants";
import Lenis from "lenis";
import {
  Camera,
  Geometry,
  Mesh,
  OGLRenderingContext,
  Program,
  Renderer,
  TextureLoader,
} from "ogl";

export function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export const lerp = (x: number, y: number, t: number) => x * (1 - t) + y * t;

export const initRenderer = (canvas: HTMLCanvasElement) => {
  return new Renderer({
    canvas,
    alpha: true,
    width: window.innerWidth,
    height: window.innerHeight,
  });
};

export const initCamera = (gl: OGLRenderingContext) => {
  const camera = new Camera(gl, { fov: 25 });
  camera.position.x = 0;
  camera.position.y = 4;
  camera.position.z = 10;

  return camera;
};

export const initProgram = (gl: OGLRenderingContext) => {
  const texture = TextureLoader.load(gl, { src: "/images/texture.png" });
  texture.minFilter = gl.NEAREST;
  texture.magFilter = gl.NEAREST;

  return new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: [0.71, 0.93, 1.0] }, // #b6edff
      uAlphaMap: { value: texture },
    },
    transparent: true,
    depthWrite: false,
  });
};

const STARS_COUNT = window.innerWidth <= 768 ? 200 : 400;

export const generateParticleData = () => {
  const positions = new Float32Array(STARS_COUNT * 3);
  const sizes = new Float32Array(STARS_COUNT);

  for (let i = 0; i < STARS_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.6) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 7;
    sizes[i] = Math.max(Math.random() * 20, 10);
  }

  return { positions, sizes };
};

export const particlesAnimationData = {
  shouldZoomOut: false,
  positionZ: 0,
  positionY: -0.4,
};

const startTime = performance.now();
let elapsed = 0;

export const updateScene = (
  program: Program,
  particles: Mesh<Geometry, Program>,
  onRender: () => void
) => {
  elapsed = (performance.now() - startTime) / 1000;
  program.uniforms.uTime.value = elapsed;

  if (particlesAnimationData.shouldZoomOut) {
    particles.position.z = -particlesAnimationData.positionZ * 24;
  } else {
    particles.position.y = particlesAnimationData.positionY * 10;
  }

  onRender();
};

// Run the particles animation on scroll...
export const onLenisScroll = (lenis: Lenis, zoomInSection: HTMLDivElement) => {
  const zoomInSectionOffsetTop = zoomInSection.offsetTop;

  if (lenis.scroll >= zoomInSectionOffsetTop) {
    const scrollOffset =
      (lenis.scroll - zoomInSectionOffsetTop) / zoomInSection.offsetHeight;

    particlesAnimationData.shouldZoomOut = true;
    particlesAnimationData.positionZ = scrollOffset;
  } else {
    const scrollOffset =
      lenis.scroll / (zoomInSectionOffsetTop - window.innerHeight);
    particlesAnimationData.shouldZoomOut = false;
    particlesAnimationData.positionY = scrollOffset - 0.4;
  }
};
