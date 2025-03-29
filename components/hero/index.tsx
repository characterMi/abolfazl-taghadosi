import { screenVariant } from "@/utils/motion";
import { MotionDiv } from "../shared/motion-div";
import SlideUpAnimation from "../shared/slide-up-animation";
import { HeroInfo } from "./hero-info";
import { HeroTitle } from "./hero-title";

const Hero = () => (
  <section className="h-sm-screen flex flex-col gap-12 relative p-4 md:p-10 xl:p-[3vw] z-[1]">
    <MotionDiv
      aria-hidden
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
      <div>
        <h1 className="absolute opacity-0">Abolfazl taghadosi</h1>
        <HeroTitle />
      </div>

      <div
        style={{ direction: "rtl" }}
        className="uppercase mt-4 lg:mt-[1.5vw]"
      >
        <SlideUpAnimation
          animate={"animate"}
          type="single-word"
          animationProps={{ animate: { delay: 4 } }}
          containerClassName="font-semibold text-[6vw] sm:text-[5vw] font-black"
        >
          {"SOFTWARE ENGINEER"}
        </SlideUpAnimation>

        <br />

        <SlideUpAnimation
          animate={"animate"}
          type="single-word"
          animationProps={{ animate: { delay: 4.2 } }}
          containerClassName="font-medium mt-4 sm:mt-2 lg:mt-[0.5vw] text-neutral-500 text-[3vw] sm:text-[1.8vw] lg:text-[1vw]"
          style={{ direction: "ltr" }}
        >
          {`&copy; ${new Date().getFullYear()} Abolfazl taghadosi`}
        </SlideUpAnimation>
      </div>
    </div>

    <HeroInfo />
  </section>
);

export default Hero;
