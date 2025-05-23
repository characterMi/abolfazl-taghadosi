import SlideUpAnimation from "../shared/slide-up-animation";
import { HeroInfo } from "./hero-info";
import { HeroTitle } from "./hero-title";

const Hero = ({ isPageLoaded }: { isPageLoaded: boolean }) => (
  <section className="h-sm-screen flex flex-col gap-12 relative z-[1]">
    <div className="flex-1">
      <HeroTitle isPageLoaded={isPageLoaded} />

      <div
        style={{ direction: "rtl" }}
        className="mt-4 lg:mt-[1.5vw] p-4 md:p-10 xl:p-[3vw] !pt-0"
      >
        <SlideUpAnimation
          animate={isPageLoaded ? "animate" : ""}
          type="single-word"
          animationProps={{ animate: { delay: 0.6 } }}
          containerClassName="font-semibold text-[6vw] sm:text-[5vw] font-black uppercase"
        >
          {"FRONT-END DEVELOPER"}
        </SlideUpAnimation>

        <br />

        <SlideUpAnimation
          animate={isPageLoaded ? "animate" : ""}
          type="single-word"
          animationProps={{ animate: { delay: 0.6 } }}
          containerClassName="font-medium mt-2 lg:mt-[1vw] text-neutral-500 text-[3vw] sm:text-[1.8vw] lg:text-[1.5vw] opacity-80"
          style={{ direction: "ltr" }}
        >
          {`${new Date().getFullYear()} &copy; Edition`}
        </SlideUpAnimation>
      </div>
    </div>

    <div className="p-4 md:p-10 xl:p-[3vw] !pt-0">
      <HeroInfo isPageLoaded={isPageLoaded} />
    </div>
  </section>
);

export default Hero;
