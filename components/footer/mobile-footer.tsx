import { socials } from "@/constants";
import FlipLink from "../shared/flip-link";
import GithubLink from "../shared/github-link";
import ExplodeAnimation from "./explode-animation";
import { Signature } from "./signature";

export const MobileFooter = () => (
  <div className="flex flex-col md:hidden md:invisible mt-10">
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-col gap-3 text-2xl sm:text-3xl relative">
        {socials.map((link) => (
          <FlipLink {...link} key={link.title} isBlank />
        ))}

        <Signature className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 min-w-40 max-w-60 -rotate-12" />
      </div>

      <div className="flex justify-between items-center flex-wrap mt-10 text-sm sm:text-lg">
        <div className="flex flex-col gap-1">
          <div>
            Inspired by <br />
            <FlipLink
              title="Lenis website"
              link="https://lenis.darkroom.engineering/"
              containerClassName="link"
              childClassName="mark"
              isBlank
            />{" "}
            &
          </div>

          <div>
            <FlipLink
              title="denniss's portfolio"
              link="https://dennissnellenberg.com/"
              containerClassName="link"
              childClassName="mark"
            />
          </div>
        </div>

        <div
          className="text-xs sm:text-base relative z-[5]"
          style={{ direction: "rtl" }}
        >
          &copy; {new Date().getFullYear()} <br />
          <ExplodeAnimation
            text="ABOLFAZL TAGHADOSI"
            style={{ direction: "ltr" }}
          />
        </div>
      </div>
    </div>

    <div className="mt-6 w-full flex justify-center">
      <GithubLink />
    </div>
  </div>
);
