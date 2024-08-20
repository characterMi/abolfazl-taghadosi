"use client";

import { footerLinks } from "@/constants";
import GithubLink from "../shared/github-link";

export const MobileFooter = () => {
  return (
    <div className="flex flex-col md:hidden">
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-3 text-2xl sm:text-3xl">
          {footerLinks.map(({ link, title }) => (
            <a href={link} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          ))}
        </div>

        <div className="flex justify-between items-center flex-wrap mt-10 text-sm sm:text-lg">
          <p>
            Inspired by <br />
            <a
              href="https://lenis.darkroom.engineering/"
              target="_blank"
              rel="noopener noreferrer"
              className="mark"
            >
              Lenis Website
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
