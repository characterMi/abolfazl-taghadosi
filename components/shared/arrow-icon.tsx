import { twMerge } from "tailwind-merge";

type Props = { mode: "dark" | "light"; className?: string };

const ArrowIcon = ({ mode, className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 11 11"
    className={twMerge("group-hover:translate-x-1/3 duration-500", className)}
  >
    <path
      stroke={mode === "dark" ? "#fff" : "#000"}
      strokeWidth="2"
      d="m1 10 9-9M3 1h7v7"
    />
  </svg>
);

export default ArrowIcon;
