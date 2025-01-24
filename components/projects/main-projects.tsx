"use client";

import { motion, useInView, useSpring } from "framer-motion";
import Image from "next/image";
import {
  type Dispatch,
  PointerEvent,
  type RefObject,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { projects } from "@/constants";
import { useCurveAnimation } from "@/hooks/use-curve-animation";
import { fadeIn } from "@/utils/motion";
import SlideUpAnimation from "../shared/slide-up-animation";

type Props = (typeof projects)[number] & {
  index: number;
  isContainerInView: boolean;
};

const SvgCurve = ({
  card,
  index,
  isContainerInView,
}: {
  card: RefObject<HTMLAnchorElement>;
} & Pick<Props, "index" | "isContainerInView">) => {
  const { ref, handleMPointerEnter, handlePointerMove, handlePointerLeave } =
    useCurveAnimation(card);

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
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerEnter={handleMPointerEnter}
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
}: Props & {
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
      onPointerEnter={() => {
        setActiveProject(index);
      }}
      onPointerLeave={() => {
        setActiveProject(index);
      }}
      style={{
        zIndex: index,
      }}
      aria-label={"Checkout " + title + " project"}
    >
      <div className="flex justify-between items-center w-full py-6 sm:py-10 lg:py-[2.5vw] px-4 sm:px-6 lg:px-[5vw] group-hover:opacity-40 group-focus:opacity-40 duration-500">
        <SlideUpAnimation
          animate={isContainerInView ? "animate" : ""}
          type="single-word"
          animationProps={{ animate: { delay: index * 0.15 } }}
          childClassName="text-neutral-900 leading-normal"
          containerClassName="text-xl smart-watch:text-3xl xss:text-4xl sm:text-5xl lg:text-[5vw] lg:font-thin group-hover:translate-x-4 group-focus:translate-x-4 lg:group-hover:translate-x-[1vw] lg:group-focus:translate-x-[1vw] duration-500"
        >
          {title}
        </SlideUpAnimation>

        <SlideUpAnimation
          animate={isContainerInView ? "animate" : ""}
          type="single-word"
          animationProps={{ animate: { delay: index * 0.175 } }}
          childClassName="text-neutral-900"
          containerClassName="text-sm smart-watch:text-xl xss:text-2xl sm:text-3xl lg:text-[2vw] font-thin opacity-80 group-hover:-translate-x-4 group-focus:-translate-x-4 lg:group-hover:-translate-x-[1vw] lg:group-focus:-translate-x-[1vw] duration-500"
        >
          {year.toString()}
        </SlideUpAnimation>
      </div>

      <SvgCurve
        card={ref}
        index={index}
        isContainerInView={isContainerInView}
      />
    </a>
  );
};

const ProjectsContainer = ({ isInView }: { isInView: boolean }) => {
  const [activeProject, setActiveProject] = useState(0);

  const smoothModalOptions = { damping: 20, stiffness: 200, mass: 0.5 };
  const modal = {
    x: useSpring(0, smoothModalOptions),
    y: useSpring(0, smoothModalOptions),
    scale: useSpring(0, smoothModalOptions),
  };

  function handleSetModalPosition(
    e: globalThis.PointerEvent | PointerEvent<HTMLDivElement>
  ) {
    const { innerWidth } = window;
    // we set the modal size to 25vw on desktop and 50vw on mobile as we did in css styles
    const modalSize = innerWidth > 767 ? innerWidth / 4 : innerWidth / 2;

    modal.x.set(e.clientX - modalSize / 2);
    modal.y.set(e.clientY - modalSize / 2);
  }

  useEffect(() => {
    window.addEventListener("pointermove", handleSetModalPosition);

    return () => {
      window.removeEventListener("pointermove", handleSetModalPosition);
    };
  }, []);

  return (
    <div className="p-4 lg:p-[5vw] relative">
      <div
        className="flex flex-col"
        onPointerEnter={(e) => {
          handleSetModalPosition(e);
          modal.scale.set(1);
        }}
        onPointerLeave={() => {
          modal.scale.set(0);
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            {...project}
            index={index}
            key={project.title}
            isContainerInView={isInView}
            setActiveProject={setActiveProject}
          />
        ))}
      </div>

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
    </div>
  );
};

export const MainProjects = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <div className="mt-20 lg:mt-[5vw]">
      <div
        className="uppercase text-neutral-900 text-4xl xss:text-5xl sm:text-7xl lg:text-[5vw] font-black mb-10 lg:mb-[2.5vw] relative z-[1]"
        style={{ direction: "rtl" }}
        aria-label="Real world projects"
      >
        <SlideUpAnimation
          animate={isInView ? "animate" : ""}
          type="single-word"
          childClassName="text-neutral-900"
        >
          Real world
        </SlideUpAnimation>

        <br />

        <SlideUpAnimation
          animate={isInView ? "animate" : ""}
          type="single-word"
          animationProps={{ animate: { delay: 0.1 } }}
          childClassName="gray-mark"
        >
          Projects
        </SlideUpAnimation>
      </div>

      <div ref={containerRef}>
        <ProjectsContainer isInView={isInView} />
      </div>
    </div>
  );
};
