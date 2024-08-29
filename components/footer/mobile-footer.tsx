"use client";

import { socials } from "@/constants";
import GithubLink from "../shared/github-link";
import SlideUpLink from "../shared/slide-up-link";

export const MobileFooter = () => {
  return (
    <div className="flex flex-col md:hidden">
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-3 text-2xl sm:text-3xl">
          {socials.map((link) => (
            <SlideUpLink {...link} key={link.title} />
          ))}
        </div>

        <div className="flex justify-between items-center flex-wrap mt-10 text-sm sm:text-lg">
          <p>
            Inspired by <br />
            <a
              href="https://lenis.darkroom.engineering/"
              target="_blank"
              rel="noopener noreferrer"
              className="mark link"
            >
              Lenis Website
            </a>{" "}
            &
            <br />
            <a
              href="https://dennissnellenberg.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mark link"
            >
              denniss&apos;s portfolio
            </a>
          </p>

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
};
