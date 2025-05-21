import SlideUpAnimation from "../shared/slide-up-animation";
import HeroAnimation from "./hero-animation";
import { HeroInfo } from "./hero-info";
import { HeroTitle } from "./hero-title";

const Hero = () => (
  <section className="h-sm-screen flex flex-col gap-12 relative p-4 md:p-10 xl:p-[3vw] z-[1]">
    <HeroAnimation />

    <div className="flex-1">
      <h1 className="absolute opacity-0">Abolfazl taghadosi</h1>
      <HeroTitle />

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
          {"FRONT-END DEVELOPER"}
        </SlideUpAnimation>

        <br />

        <SlideUpAnimation
          animate={"animate"}
          type="single-word"
          animationProps={{ animate: { delay: 4.2 } }}
          containerClassName="font-medium mt-2 lg:mt-[1vw] text-neutral-500 text-[3vw] sm:text-[1.8vw] lg:text-[1vw]"
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
