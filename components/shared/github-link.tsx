import Image from "next/image";
import ArrowIcon from "./arrow-icon";

const GithubLink = () => {
  return (
    <a
      className="inline-flex group button-container overflow-hidden text-nowrap w-full outline-none"
      href="https://github.com/characterMi"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex justify-center items-center size-12 border border-pink group-hover:border-white bg-black">
        <Image
          src={"/icons/github.svg"}
          alt="Github"
          width={20}
          height={20}
          className="object-cover w-2/3 h-2/3"
        />
      </div>

      <div
        className="uppercase relative text-sm font-bold font-sans transition-[all_0.85s_cubic-bezier(.17,.67,.14,.93)] cube"
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          transformOrigin: "100% 50%",
          WebkitTransformOrigin: "100% 50%",
          msTransformOrigin: "100% 50%",
        }}
      >
        <div
          className="flex items-center gap-2 w-full h-full px-6 bg-white text-black"
          style={{
            transform: "rotateX(90deg) translate3d(0, 0, 2em)",
          }}
        >
          checkout my github <ArrowIcon mode="light" size={9} />
        </div>
        <div
          className="flex items-center gap-2 absolute -translate-x-1/2 text-nowrap top-0 bg-pink text-black w-full h-full px-6"
          style={{ transform: "translate3d(0, 0, 2em)" }}
        >
          checkout my github{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 11 11"
            className="size-[9px] group-hover:translate-x-1/3 duration-500"
          >
            <ArrowIcon mode="light" size={9} />
          </svg>
        </div>
      </div>
    </a>
  );
};

export default GithubLink;
