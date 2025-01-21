import GithubLink from "../shared/github-link";
import { DesktopFooter } from "./desktop-footer";
import { FooterContainer } from "./footer-container";
import { MobileFooter } from "./mobile-footer";

const Footer = () => (
  <FooterContainer>
    <div className="flex-1 flex flex-col justify-center md:justify-between relative">
      <h2 className="title !text-[10vw] md:text-[12vw]">
        AVAILABLE <br /> <mark className="mark">FOR WORK</mark>
        <span className="block md:hidden text-[10vw]">
          & OPEN TO NEW <br /> OPPORTUNITIES
        </span>
      </h2>

      <h2 className="hidden md:block title" style={{ direction: "rtl" }}>
        OPEN TO NEW & <br /> OPPORTUNITIES
      </h2>

      <div className="absolute bottom-0 left-0 hidden md:block">
        <GithubLink />
      </div>
    </div>

    <DesktopFooter />

    <MobileFooter />
  </FooterContainer>
);

export default Footer;
