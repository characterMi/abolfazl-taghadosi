"use client";

import { socials } from "@/constants";
import Magnetic from "../shared/magnetic";
import SlideUpLink from "../shared/slide-up-link";

export const DesktopFooter = () => {
  return (
    <div className="hidden md:flex w-full items-center justify-between pt-10 lg:pt-[2.5vw] mt-10 lg:mt-[2.5vw] border-t border-gray-400">
      <div className="flex items-center gap-4 text-xs lg:text-[0.8vw] lg:gap-[1vw] uppercase">
        {socials.map((link) => (
          <Magnetic key={link.title}>
            <SlideUpLink {...link} isBlank />
          </Magnetic>
        ))}

        <p>
          Inspired by{" "}
          <SlideUpLink
            title={"Lenis website"}
            link={"https://lenis.darkroom.engineering/"}
            childClassName="mark"
            isBlank
          />{" "}
          &{" "}
          <SlideUpLink
            title={"denniss's portfolio"}
            link={"https://dennissnellenberg.com/"}
            childClassName="mark"
            isBlank
          />
        </p>
      </div>

      <p className="text-xs md:hidden lg:block lg:text-[0.8vw]">
        &copy; {new Date().getFullYear()} ABOLFAZL TAGHADOSI
      </p>
    </div>
  );
};
