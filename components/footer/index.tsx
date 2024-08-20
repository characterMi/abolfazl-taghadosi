import GithubLink from "../shared/github-link";
import { DesktopFooter } from "./desktop-footer";
import { FooterProvider } from "./footer-provider";
import { MobileFooter } from "./mobile-footer";

const Footer = () => {
  return (
    <FooterProvider>
      <div className="flex-1 flex flex-col justify-center md:justify-between relative">
        <h3 className="title !text-[10vw] md:text-[12vw]">
          AVAILABLE <br /> <mark className="mark">FOR WORK</mark>
          <span className="block md:hidden text-[10vw]">
            & OPEN TO <br /> NEW OPPORTUNITIES
          </span>
        </h3>

        <h3 className="hidden md:block title" style={{ direction: "rtl" }}>
          OPEN TO NEW & <br /> OPPORTUNITIES
        </h3>

        <div className="absolute bottom-0 left-0 hidden md:block">
          <GithubLink />
        </div>
      </div>

      <DesktopFooter />

      <MobileFooter />
    </FooterProvider>
  );
};

export default Footer;
