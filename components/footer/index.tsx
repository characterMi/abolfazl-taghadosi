"use client";

import GithubLink from "../shared/github-link";
import { DesktopFooter } from "./desktop-footer";
import { FooterContainer } from "./footer-container";
import { MobileFooter } from "./mobile-footer";
import { Signature } from "./signature";

const Footer = () => (
  <FooterContainer>
    <div className="flex-1 flex flex-col justify-center md:justify-between relative">
      <h2 className="title !text-[10vw] md:text-[12vw]">
        AVAILABLE <br /> <mark className="mark">FOR WORK</mark>
        <span className="block md:hidden md:invisible text-[10vw]">
          & OPEN TO NEW <br /> OPPORTUNITIES
        </span>
      </h2>

      <h2
        className="hidden invisible md:block md:visible title mt-[20vw] lg:mt-[12vw]"
        style={{ direction: "rtl" }}
      >
        OPEN TO NEW & <br /> OPPORTUNITIES
      </h2>

      <div className="absolute bottom-0 left-0 hidden invisible md:flex md:visible flex-col gap-5">
        <Signature width="100%" />

        <GithubLink />
      </div>
    </div>

    <DesktopFooter />

    <MobileFooter />
  </FooterContainer>
);

export default Footer;
