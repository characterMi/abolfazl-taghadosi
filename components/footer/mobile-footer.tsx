import { socials } from "@/constants";
import FlipLink from "../shared/flip-link";
import GithubLink from "../shared/github-link";

export const MobileFooter = () => (
  <div className="flex flex-col md:hidden">
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-col gap-3 text-2xl sm:text-3xl">
        {socials.map((link) => (
          <FlipLink {...link} key={link.title} isBlank />
        ))}
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

        <p className="text-xs sm:text-base" style={{ direction: "rtl" }}>
          &copy; {new Date().getFullYear()} <br /> ABOLFAZL TAGHADOSI
        </p>
      </div>
    </div>

    <div className="mt-6 w-full flex justify-center">
      <GithubLink />
    </div>
  </div>
);
