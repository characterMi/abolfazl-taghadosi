import { screenVariant } from "@/utils/motion";
import { MotionDiv } from "../shared/motion-div";
import { HeaderDesc } from "./header-desc";
import { HeaderInfo } from "./header-info";
import { HeaderTitle } from "./header-title";

const Hero = () => {
  return (
    <section className="h-screen flex flex-col gap-12 relative overflow-hidden p-4 md:p-10">
      <MotionDiv
        className="bg-pink w-[150%] absolute top-0 left-1/2 -translate-x-1/2 z-10 rounded-b-[50%]"
        variants={screenVariant}
        initial="initial"
        animate="animate"
      />

      <div className="flex-1">
        <HeaderTitle />

        <HeaderDesc />
      </div>

      <HeaderInfo />
    </section>
  );
};

export default Hero;
