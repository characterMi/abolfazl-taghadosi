"use client";

import { allProjects } from "@/constants";
import { slideUp } from "@/utils/motion";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ArrowIcon from "../shared/arrow-icon";
import SlideUpAnimation from "../shared/slide-up-animation";

const Title = ({ isInView }: { isInView: boolean }) => (
  <div className="uppercase w-full md:w-[37%] text-6xl md:text-[2.75rem] lg:text-[4vw] font-black mb-6 relative">
    <SlideUpAnimation
      animate={isInView ? "animate" : ""}
      text={"All of my"}
      type="single-word"
      childClassName="text-neutral-900"
    />

    <br />

    <SlideUpAnimation
      animate={isInView ? "animate" : ""}
      text={"Works"}
      type="single-word"
      animationProps={{ animate: { delay: 0.1 } }}
      childClassName="gray-mark"
    />
  </div>
);

export const AllProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-80 lg:mt-[20vw]">
      <Title isInView={isInView} />

      <div className="w-full md:w-[63%]" ref={ref}>
        {allProjects.map((project, i) => (
          <div key={project.srcCode} className="group">
            <div className="w-full flex flex-wrap gap-4 lg:gap-[1vw] items-center justify-between px-4 lg:px-[1vw] py-8 lg:py-[2vw] text-neutral-900 cursor-pointer text-xl xss:text-2xl sm:text-3xl lg:text-[2vw] relative">
              <div className="absolute w-full h-0 top-0 left-0 bg-gradient-to-r from-primary to-light-blue group-hover:top-auto group-hover:bottom-0 group-hover:h-full transition-all duration-300" />

              <div className="flex items-center gap-4 z-[1] group-hover:translate-x-3 lg:group-hover:translate-x-[1vw] duration-500">
                <SlideUpAnimation
                  animate={isInView ? "animate" : ""}
                  text={project.name}
                  type="single-word"
                  animationProps={{ animate: { delay: i * 0.05 + 0.5 } }}
                  childClassName="text-neutral-900 leading-tight"
                  containerClassName="font-semibold leading-loose"
                />

                <ArrowIcon
                  mode="light"
                  className="size-4 lg:size-[1vw] hidden xss:block opacity-0 group-hover:opacity-100 translate-y-1/2 -translate-x-1/2 group-hover:translate-y-0 group-hover:translate-x-0"
                />
              </div>
              <a
                href={project.srcCode}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold uppercase z-[1] slide-up-animation leading-tight hidden xss:block link focus:opacity-80"
              >
                <motion.span
                  className="hidden xss:block text-neutral-900 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-neutral-900 before:scale-0 group-hover:before:scale-100 before:transition-transform before:duration-500"
                  variants={slideUp}
                  initial="initial"
                  animate={isInView ? "animate" : ""}
                  exit="initial"
                  custom={{ delay: 0.55 + i * 0.05 }}
                >
                  Link
                </motion.span>
              </a>

              <a
                href={project.srcCode}
                target="_blank"
                rel="noopener noreferrer"
                className="z-[1] xss:hidden link"
                aria-label={`Checkout ${project.name} project`}
              >
                <ArrowIcon
                  mode="light"
                  className="size-5 block xss:hidden group-hover:-translate-x-1/2"
                />
              </a>
            </div>

            <motion.hr
              className="h-[1px] border-none bg-gray-400"
              variants={{
                initial: { scaleX: 0 },
                animate: {
                  scaleX: 1,
                  transition: { duration: 0.5, delay: 0.6 + i * 0.05 },
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
