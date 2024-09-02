import { socials } from "@/constants";
import { twMerge } from "tailwind-merge";

type Props = (typeof socials)[number] & {
  containerClassName?: string;
  childClassName?: string;
  isBlank?: boolean;
};

const SlideUpLink = ({
  link,
  title,
  childClassName,
  containerClassName,
  isBlank,
}: Props) => {
  const isBlankOptions = isBlank
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <a
      href={link}
      className={twMerge(
        "link relative overflow-hidden inline-flex group w-max leading-tight",
        containerClassName
      )}
      {...isBlankOptions}
    >
      <span className="opacity-0">{title}</span>
      <span
        className={twMerge(
          "absolute top-0 left-0 group-hover:-top-full group-focus:-top-full duration-500",
          childClassName
        )}
      >
        {title}
      </span>
      <span
        className={twMerge(
          "absolute top-full left-0 group-hover:top-0 group-focus:top-0 duration-500",
          childClassName
        )}
      >
        {title}
      </span>
    </a>
  );
};

export default SlideUpLink;
