"use client";

import { projects } from "@/constants";
import Image from "next/image";

export const MainProjects = () => {
  return (
    <div className="mt-20">
      <h5 className="uppercase text-black" style={{ direction: "rtl" }}>
        Real world <br /> <mark className="gray-mark">Projects</mark>
      </h5>

      <div className="flex gap-10 flex-wrap mt-10">
        {projects.map((project, index) => (
          <a
            key={project.srcCode}
            href={project.srcCode}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-400 p-10 w-full md:size-96"
          >
            <p>{index < 10 ? `0${index + 1}` : index + 1}</p>

            <Image
              src={project.imgSrc}
              alt={project.text.id}
              width={600}
              height={600}
              className="object-cover w-full h-auto"
            />

            <svg
              width="100%"
              viewBox={project.text.svgViewBox}
              xmlns="http://www.w3.org/2000/svg"
              className="bg-blue-500"
            >
              <g
                id="svgGroup"
                strokeLinecap="round"
                fillRule="evenodd"
                fontSize="9pt"
                stroke="#000"
                strokeWidth="0.25mm"
                fill="#000"
                style={{ stroke: "#000", strokeWidth: "0.25mm", fill: "#000" }}
              >
                <path d={project.text.d} vectorEffect="non-scaling-stroke" />
              </g>
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
};
