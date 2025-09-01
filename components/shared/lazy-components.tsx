import { wait } from "@/lib";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "./error-boundary";

const Particles = dynamic(() => import("../particles"));
const CustomScroll = dynamic(() => import("../shared/custom-scroll"));

const LazyComponents = () => {
  const [isHeroAnimationCompleted, setIsHeroAnimationCompleted] =
    useState(false);

  useEffect(() => {
    (async () => {
      await wait(1000);
      setIsHeroAnimationCompleted(true);
    })();
  }, []);

  return (
    <>
      {isHeroAnimationCompleted && (
        <ErrorBoundary fallback={null}>
          <CustomScroll />
        </ErrorBoundary>
      )}
      {isHeroAnimationCompleted && (
        <ErrorBoundary fallback={null}>
          <Particles />
        </ErrorBoundary>
      )}
    </>
  );
};

export default LazyComponents;
