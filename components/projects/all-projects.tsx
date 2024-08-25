"use client";

import { allProjects } from "@/constants";
import { slideUp } from "@/utils/motion";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ArrowIcon from "../shared/arrow-icon";

const AllProjectsTitle = ({ isInView }: { isInView: boolean }) => (
  <div className="uppercase w-full md:w-[37%] text-6xl md:text-[2.75rem] lg:text-6xl xl:text-7xl font-black mb-6 relative">
    <h5 className="slide-up-animation">
      <motion.span
        className="text-black"
        variants={slideUp}
        initial="initial"
        animate={isInView ? "animate" : ""}
        exit="initial"
      >
        All of my
      </motion.span>
    </h5>

    <br />

    <h5 className="slide-up-animation">
      <motion.span
        className="gray-mark"
        variants={slideUp}
        initial="initial"
        animate={isInView ? "animate" : ""}
        exit="initial"
        custom={0.1}
      >
        Works
      </motion.span>
    </h5>
  </div>
);

export const AllProjects = () => {
  // Content for website... more about me: front-end development, creative web development, 3d web development and configuration
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-56" ref={ref}>
      <AllProjectsTitle isInView={isInView} />

      <div className="w-full md:w-[63%]">
        {allProjects.map((project, i) => (
          <div key={project.srcCode} className="group">
            <div className="w-full flex flex-wrap gap-4 items-center justify-between px-4 py-8 text-black cursor-pointer text-xl xss:text-2xl sm:text-3xl relative">
              <div className="absolute w-full h-0 top-0 left-0 bg-pink group-hover:top-auto group-hover:bottom-0 group-hover:h-full transition-all duration-300" />

              <div className="flex items-center gap-4 z-[1] group-hover:translate-x-3 duration-500">
                <p className="font-semibold slide-up-animation">
                  <motion.span
                    className="text-black"
                    variants={slideUp}
                    initial="initial"
                    animate={isInView ? "animate" : ""}
                    exit="initial"
                    custom={{ delay: i * 0.05 }}
                  >
                    {project.name}
                  </motion.span>
                </p>
                <ArrowIcon
                  mode="light"
                  size={18}
                  className="hidden xss:block opacity-0 group-hover:opacity-100 translate-y-1/2 -translate-x-1/2 group-hover:translate-y-0 group-hover:translate-x-0"
                />
              </div>
              <a
                href={project.srcCode}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold uppercase z-[1] slide-up-animation"
              >
                <motion.span
                  className="hidden xss:block text-black relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-black before:scale-0 group-hover:before:scale-100 before:transition-transform before:duration-500"
                  variants={slideUp}
                  initial="initial"
                  animate={isInView ? "animate" : ""}
                  exit="initial"
                  custom={{ delay: 0.05 + i * 0.05 }}
                >
                  Link
                </motion.span>
                <ArrowIcon
                  mode="light"
                  size={20}
                  className="block xss:hidden group-hover:-translate-x-1/2"
                />
              </a>
            </div>

            <motion.hr
              className="h-[1px] border-none bg-gray-400"
              variants={{
                initial: { scaleX: 0 },
                animate: {
                  scaleX: 1,
                  transition: { duration: 0.5, delay: 0.1 + i * 0.05 },
                },
              }}
              initial="initial"
              animate={isInView ? "animate" : ""}
              exit="initial"
              style={{
                transformOrigin: "right",
                WebkitTransformOrigin: "right",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
