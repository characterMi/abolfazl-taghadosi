"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useRef,
  useState,
} from "react";

import { projects } from "@/constants";
import { useCurveAnimation } from "@/hooks/use-curve-animation";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import { useMainProjectsAnimation } from "@/hooks/use-main-projects-animation";
import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { fadeIn } from "@/utils/motion";
import { twMerge } from "tailwind-merge";
import Magnetic from "../shared/magnetic";
import SlideUpAnimation from "../shared/slide-up-animation";

type Props = {
  index: number;
  isContainerInView: boolean;
  shouldReduceMotion: boolean;
};

type ProjectCardProps = (typeof projects)[number] & Props;

const SvgCurve = ({
  card,
  index,
  isContainerInView,
  shouldReduceMotion,
}: {
  card: RefObject<HTMLAnchorElement>;
} & Props) => {
  const { ref, handleMPointerEnter, handlePointerMove, handlePointerLeave } =
    useCurveAnimation(card, isContainerInView);

  return (
    <motion.div
      className="h-[1px] w-full relative mb-2"
      variants={fadeIn}
      initial="initial"
      animate={isContainerInView ? "animate" : ""}
      exit="initial"
      custom={{
        delay: index * 0.125,
      }}
      aria-hidden
    >
      <div
        className="h-[40px] lg:h-[2.5vw] relative -top-5 z-10"
        onPointerMove={shouldReduceMotion ? undefined : handlePointerMove}
        onPointerLeave={shouldReduceMotion ? undefined : handlePointerLeave}
        onPointerEnter={shouldReduceMotion ? undefined : handleMPointerEnter}
      />
      <svg className="w-full h-[100px] lg:h-[6vw] absolute -top-12">
        <path
          ref={ref}
          className="stroke-[0.5] min-[2000px]:stroke-1 stroke-neutral-500 fill-none"
        />
      </svg>
    </motion.div>
  );
};

const ProjectCard = ({
  index,
  isContainerInView,
  srcCode,
  title,
  year,
  setActiveProject,
  shouldReduceMotion,
}: ProjectCardProps & {
  setActiveProject: Dispatch<SetStateAction<number>>;
}) => {
  const ref = useRef(null);

  return (
    <a
      href={srcCode}
      ref={ref}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card flex justify-between w-full flex-col group"
      onPointerOver={() => {
        setActiveProject(index);
      }}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        zIndex: index,
      }}
      aria-label={"Checkout " + title + " project"}
    >
      <div className="flex justify-between items-center w-full py-6 sm:py-10 lg:py-[2.5vw] px-4 sm:px-6 lg:px-[5vw]">
        <SlideUpAnimation
          animate={isContainerInView ? "animate" : ""}
          type="single-word"
          animationProps={{ animate: { delay: index * 0.15 } }}
          childClassName="text-neutral-900 leading-normal"
          containerClassName={twMerge(
            "text-xl smart-watch:text-3xl xss:text-4xl sm:text-5xl lg:text-[5vw] lg:font-thin group-hover:translate-x-4 group-focus:translate-x-4 lg:group-hover:translate-x-[1vw] lg:group-focus:translate-x-[1vw] group-hover:opacity-40 group-focus:opacity-40",
            !shouldReduceMotion && "duration-500"
          )}
        >
          {title}
        </SlideUpAnimation>

        <SlideUpAnimation
          animate={isContainerInView ? "animate" : ""}
          type="single-word"
          animationProps={{ animate: { delay: index * 0.175 } }}
          childClassName="text-neutral-900"
          containerClassName={twMerge(
            "text-sm smart-watch:text-xl xss:text-2xl sm:text-3xl lg:text-[2vw] font-thin opacity-80 group-hover:-translate-x-4 group-focus:-translate-x-4 lg:group-hover:-translate-x-[1vw] lg:group-focus:-translate-x-[1vw] group-hover:opacity-40 group-focus:opacity-40",
            !shouldReduceMotion && "duration-500"
          )}
        >
          {year.toString()}
        </SlideUpAnimation>
      </div>

      <SvgCurve
        card={ref}
        index={index}
        isContainerInView={isContainerInView}
        shouldReduceMotion={shouldReduceMotion}
      />
    </a>
  );
};

const ProjectsContainer = ({
  projectsContainerRef,
  children,
}: {
  projectsContainerRef: RefObject<HTMLDivElement>;
  children: React.ReactNode;
}) => {
  const isTouchDevice = useIsTouchDevice();
  const isContainerInView = useInView(projectsContainerRef, {
    margin: "0% 0% -80% 0%",
  });

  return (
    <>
      <AnimatePresence mode="wait">
        {isTouchDevice && isContainerInView && (
          <motion.div
            className="fixed top-0 left-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-live="polite"
          >
            <Magnetic>
              <div className="flex items-center gap-2 px-4 py-10">
                <div
                  aria-hidden
                  className="w-4 h-8 rounded-full border-2 border-dark-blue relative"
                >
                  <motion.div
                    className="size-1.5 rounded-full bg-gradient-to-t from-dark-blue to-primary absolute left-1/4"
                    animate={{ y: [5, 17, 5] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                </div>

                <p className="dark-mark text-lg font-bold">Grab to scroll</p>
              </div>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col" ref={projectsContainerRef}>
        {children}
      </div>
    </>
  );
};

export const MainProjects = () => {
  const shouldReduceMotion = useReduceMotion();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const [activeProject, setActiveProject] = useState(0);

  const { modal, projectsContainerRef } = useMainProjectsAnimation();

  return (
    <div className="mt-20 lg:mt-[5vw]">
      <div
        className="uppercase text-neutral-900 text-4xl xss:text-5xl sm:text-7xl lg:text-[5vw] font-black mb-10 lg:mb-[2.5vw] relative z-[1]"
        style={{ direction: "rtl" }}
      >
        <span className="sr-only">Real world projects</span>

        <SlideUpAnimation
          animate={isInView ? "animate" : ""}
          type="single-word"
          childClassName="text-neutral-900"
          isHidden
        >
          Real world
        </SlideUpAnimation>

        <br aria-hidden />

        <SlideUpAnimation
          animate={isInView ? "animate" : ""}
          type="single-word"
          animationProps={{ animate: { delay: 0.1 } }}
          childClassName="gray-mark"
          isHidden
        >
          Projects
        </SlideUpAnimation>
      </div>

      <div className="p-4 lg:p-[5vw] relative" ref={containerRef}>
        <ProjectsContainer projectsContainerRef={projectsContainerRef}>
          {projects.map((project, index) => (
            <ProjectCard
              {...project}
              index={index}
              key={project.title}
              isContainerInView={isInView}
              setActiveProject={setActiveProject}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </ProjectsContainer>

        {!shouldReduceMotion && (
          <motion.div
            aria-hidden
            className="fixed top-0 left-0 size-[50vw] md:size-[25vw] overflow-hidden pointer-events-none z-40"
            style={{
              left: modal.x,
              top: modal.y,
              scale: modal.scale,
            }}
            transition={{ duration: 0.5 }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                className="w-full h-full px-[2vw] flex items-center"
                animate={{
                  y: `-${activeProject * 100}%`,
                  transition: {
                    duration: 0.5,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }}
                style={{
                  backgroundColor: project.backgroundColor,
                }}
              >
                <Image
                  src={project.imgSrc}
                  alt={project.title}
                  width={1200}
                  height={750}
                  className="w-full"
                  placeholder="blur"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
