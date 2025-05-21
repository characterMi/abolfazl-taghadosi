"use client";

import { heroSectionTitle } from "@/constants";

export const HeroTitle = () => (
  <div className="flex w-full" aria-hidden>
    {heroSectionTitle.map((letter) => (
      <svg
        width="100%"
        viewBox={letter.svgViewBox}
        xmlns="http://www.w3.org/2000/svg"
        key={letter.id}
        id={letter.id}
        strokeLinecap="round"
        fillRule="evenodd"
        fontSize="9pt"
        stroke="#56ccf2"
        fill="#56ccf2"
        className="stroke-primary fill-primary"
      >
        <path d={letter.d} vectorEffect="non-scaling-stroke" />
      </svg>
    ))}
  </div>
);
