import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { twMerge } from "tailwind-merge";

type Props = { mode: "dark" | "light"; className?: string };

const ArrowIcon = ({ mode, className }: Props) => {
  const shouldReduceMotion = useReduceMotion();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 11 11"
      className={twMerge(
        !shouldReduceMotion && "group-hover:translate-x-1/3 duration-500",
        className
      )}
      aria-hidden
    >
      <path
        stroke={mode === "dark" ? "#fff" : "#000"}
        strokeWidth="2"
        d="m1 10 9-9M3 1h7v7"
      />
    </svg>
  );
};
export default ArrowIcon;
