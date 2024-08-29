import { socials } from "@/constants";
import { twMerge } from "tailwind-merge";

const SlideUpLink = ({
  link,
  title,
  className,
}: (typeof socials)[number] & { className?: string }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={
        "link relative overflow-hidden inline-flex group w-max leading-tight"
      }
    >
      <span className="opacity-0">{title}</span>
      <span
        className={twMerge(
          "absolute top-0 left-0 group-hover:-top-full duration-500",
          className
        )}
      >
        {title}
      </span>
      <span
        className={twMerge(
          "absolute top-full left-0 group-hover:top-0 duration-500",
          className
        )}
      >
        {title}
      </span>
    </a>
  );
};

export default SlideUpLink;
