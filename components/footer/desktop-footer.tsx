import { socials } from "@/constants";
import FlipLink from "../shared/flip-link";
import Magnetic from "../shared/magnetic";
import ExplodeAnimation from "./explode-animation";

export const DesktopFooter = () => {
  return (
    <div className="hidden invisible md:flex md:visible w-full items-center justify-between pt-10 lg:pt-[2.5vw] mt-10 lg:mt-[2.5vw] border-t border-gray-400">
      <div className="flex items-center gap-4 text-xs lg:text-[0.8vw] lg:gap-[1vw] uppercase">
        {socials.map((link) => (
          <Magnetic key={link.title}>
            <FlipLink {...link} isBlank />
          </Magnetic>
        ))}

        <p>
          Inspired by{" "}
          <FlipLink
            title={"Lenis website"}
            link={"https://lenis.darkroom.engineering/"}
            childClassName="mark"
            isBlank
          />{" "}
          &{" "}
          <FlipLink
            title={"denniss's portfolio"}
            link={"https://dennissnellenberg.com/"}
            childClassName="mark"
            isBlank
          />
        </p>
      </div>

      <div className="text-xs md:hidden md:invisible lg:block lg:visible lg:text-[0.8vw]">
        &copy; {new Date().getFullYear()}{" "}
        <ExplodeAnimation text="ABOLFAZL TAGHADOSI" />
      </div>
    </div>
  );
};
