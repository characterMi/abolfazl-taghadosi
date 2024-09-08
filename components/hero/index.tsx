import { screenVariant } from "@/utils/motion";
import { MotionDiv } from "../shared/motion-div";
import { HeroDesc } from "./hero-desc";
import { HeroInfo } from "./hero-info";
import { HeroTitle } from "./hero-title";

const Hero = () => {
  return (
    <section className="h-sm-screen flex flex-col gap-12 relative p-4 md:p-10 xl:p-[3vw] z-[1]">
      <MotionDiv
        className="absolute top-0 left-0 z-10 w-full h-full overflow-hidden"
        initial={{ display: "block" }}
        animate={{ display: "none", transition: { delay: 4.2 } }}
      >
        <MotionDiv
          className="bg-primary w-[150%] rounded-b-[50%] absolute top-0 left-1/2 -translate-x-1/2"
          variants={screenVariant}
          initial="initial"
          animate="animate"
        />
      </MotionDiv>

      <div className="flex-1">
        <HeroTitle />

        <HeroDesc />
      </div>

      <HeroInfo />
    </section>
  );
};

export default Hero;
