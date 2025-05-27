import Image from "next/image";
import ArrowIcon from "./arrow-icon";

const GithubLink = () => (
  <a
    className="inline-flex group button-container overflow-hidden text-nowrap md:w-full outline-none link"
    href="https://github.com/characterMi"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Check my github"
  >
    <div className="hidden invisible smart-watch:flex smart-watch:visible justify-center items-center size-12 lg:size-[4vw] border border-primary group-hover:border-white group-focus:border-white bg-neutral-900">
      <Image
        src={"/icons/github.svg"}
        alt="Github icon"
        width={20}
        height={20}
        className="object-cover w-2/3 h-2/3"
      />
    </div>

    <div
      className="h-10 smart-watch:h-auto uppercase relative text-sm font-bold font-sans transition-[all_0.85s_cubic-bezier(.17,.67,.14,.93)] cube"
      style={{
        transformStyle: "preserve-3d",
        WebkitTransformStyle: "preserve-3d",
        transformOrigin: "100% 50%",
        WebkitTransformOrigin: "100% 50%",
        msTransformOrigin: "100% 50%",
      }}
    >
      <div
        className="flex items-center gap-2 lg:gap-[0.5vw] lg:text-[1.2vw] w-full h-full px-6 lg:px-[1.5vw] bg-white text-neutral-900"
        style={{
          transform: "rotateX(90deg) translate3d(0, 0, 2em)",
        }}
      >
        checkout my github{" "}
        <ArrowIcon mode="light" className="size-[9px] lg:size-[0.8vw]" />
      </div>
      <div
        className="flex items-center gap-2 lg:gap-[0.5vw] lg:text-[1.2vw] absolute -translate-x-1/2 text-nowrap top-0 bg-gradient-to-r from-primary to-dark-blue text-neutral-900 w-full h-full px-6 lg:px-[1.5vw]"
        style={{ transform: "translate3d(0, 0, 2em)" }}
        aria-hidden
      >
        checkout my github{" "}
        <ArrowIcon mode="light" className="size-[9px] lg:size-[0.8vw]" />
      </div>
    </div>
  </a>
);

export default GithubLink;
