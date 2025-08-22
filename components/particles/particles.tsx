import { useParticles } from "@/hooks/use-particles";

export const Particles = () => {
  const canvasRef = useParticles();

  return <canvas ref={canvasRef} className="size-full pointer-events-none" />;
};
