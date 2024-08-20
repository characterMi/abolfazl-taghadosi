"use client";

import { allProjects } from "@/constants";

export const LessImportantProjects = () => {
  // https://uiverse.io/abrahamcalsin/sour-donkey-65 https://uiverse.io/KINGFRESS/giant-deer-25 https://uiverse.io/mrhyddenn/tall-goose-46 https://dennissnellenberg.com/
  // Content for website... more about me: front-end development, creative web development, 3d web development and configuration
  return (
    <div className="flex flex-col md:flex-row mt-24">
      <h5 className="uppercase text-black w-full md:w-1/3">
        Less important <br /> <mark className="gray-mark">Projects</mark>
      </h5>

      <div className="w-full md:w-2/3">
        {allProjects.map((project) => (
          <div
            key={project.srcCode}
            className="w-full flex items-center justify-between p-2 border-b border-gray-600 text-black cursor-pointer"
          >
            <p className="text-black font-semibold">{project.name}</p>

            <a
              href={project.srcCode}
              target="_blank"
              rel="noopener noreferrer"
              className="font-black"
            >
              LINK
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
