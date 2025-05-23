import { wait } from "@/lib";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Particles = dynamic(() => import("../particles"), {
  ssr: false,
});
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
      {isHeroAnimationCompleted && <CustomScroll />}
      {isHeroAnimationCompleted && <Particles />}
    </>
  );
};

export default LazyComponents;
