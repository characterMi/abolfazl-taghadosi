"use client";

import { footerLinks } from "@/constants";
import Magnetic from "../shared/magnetic";

export const DesktopFooter = () => {
  return (
    <div className="hidden md:flex w-full items-center justify-between pt-10 mt-10 border-t border-gray-400">
      <div className="flex items-center gap-4 text-xs uppercase">
        {footerLinks.map(({ link, title }) => (
          <Magnetic key={link}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {title}
            </a>
          </Magnetic>
        ))}

        <p>
          Inspired by{" "}
          <a
            href="https://lenis.darkroom.engineering/"
            target="_blank"
            rel="noopener noreferrer"
            className="mark link"
          >
            Lenis website
          </a>
        </p>
      </div>

      <p className="text-xs">
        &copy; {new Date().getFullYear()} ABOLFAZL TAGHADOSI
      </p>
    </div>
  );
};
