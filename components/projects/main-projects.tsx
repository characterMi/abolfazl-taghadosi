"use client";

import { motion, useInView, useSpring } from "framer-motion";
import Image from "next/image";
import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { projects } from "@/constants";
import { useCurveAnimation } from "@/hooks/use-curve-animation";
import { fadeIn, slideUp } from "@/utils/motion";
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

const MobileProjectCard = ({
  imgSrc,
  srcCode,
  title,
  year,
  backgroundColor,
  index,
  isContainerInView,
}: Props) => {
  const card = useRef<HTMLAnchorElement>(null);

  const MotionImage = useMemo(() => motion(Image), []);

  return (
    <motion.a
      variants={slideUp}
      initial="initial"
      animate={isContainerInView ? "animate" : ""}
      exit="initial"
      custom={{
        delay: index * 0.1,
        duration: 1.5,
      }}
      href={srcCode}
      target="_blank"
      rel="noopener noreferrer"
      key={title}
      className="project-card flex flex-col gap-8 w-full h-full"
      ref={card}
      aria-label={"Checkout " + title + " project"}
    >
      <div className="w-full aspect-square bg-neutral-100 px-8 flex items-center group relative">
        <div
          className="w-[calc(100%-4rem)] aspect-[8/5] absolute"
          style={{ backgroundColor }}
          aria-hidden
        />
        <MotionImage
          src={imgSrc}
          alt={title + " image"}
          width={1200}
          height={750}
          className="object-cover w-full h-auto group-hover:scale-[1.025] group-focus:scale-[1.025] duration-500"
          placeholder="blur"
          initial={{
            clipPath: "polygon(100% 0, 0 0, 0 0, 100% 0)",
          }}
          animate={
            isContainerInView
              ? {
                  clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
                  transition: {
                    duration: 1,
                    delay: index * 0.05 + 1,
                  },
                }
              : {}
          }
        />
      </div>

      <SvgCurve
        card={card}
        index={index}
        isContainerInView={isContainerInView}
      />

      <div className="w-full flex items-center justify-between">
        <SlideUpAnimation
          animate={isContainerInView ? "animate" : ""}
          type="single-word"
          animationProps={{ animate: { delay: index * 0.15 } }}
          childClassName="text-neutral-900 leading-snug"
          containerClassName="text-4xl sm:text-6xl md:text-4xl font-thin"
        >
          {title}
        </SlideUpAnimation>

        <SlideUpAnimation
          animate={isContainerInView ? "animate" : ""}
          type="single-word"
          animationProps={{ animate: { delay: index * 0.175 } }}
          childClassName="text-neutral-900"
          containerClassName="text-2xl sm:text-3xl md:text-2xl font-semibold"
        >
          {year.toString()}
        </SlideUpAnimation>
      </div>
    </motion.a>
  );
};

const DesktopProjectCard = ({
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
      onMouseEnter={() => {
        setActiveProject(index);
      }}
      onMouseLeave={() => {
        setActiveProject(index);
      }}
      style={{
        zIndex: index,
      }}
      aria-label={"Checkout " + title + " project"}
    >
      <div className="flex justify-between items-center w-full py-[2.5vw] px-[5vw] group-hover:opacity-40 group-focus:opacity-40 duration-500">
        <SlideUpAnimation
          animate={isContainerInView ? "animate" : ""}
          type="single-word"
          animationProps={{ animate: { delay: index * 0.15 } }}
          childClassName="text-neutral-900 leading-normal"
          containerClassName="text-[5vw] font-thin group-hover:-translate-x-[1vw] group-focus:-translate-x-[1vw] duration-500"
        >
          {title}
        </SlideUpAnimation>

        <SlideUpAnimation
          animate={isContainerInView ? "animate" : ""}
          type="single-word"
          animationProps={{ animate: { delay: index * 0.175 } }}
          childClassName="text-neutral-900"
          containerClassName="text-[2vw] font-thin opacity-80 group-hover:translate-x-[1vw] group-focus:translate-x-[1vw] duration-500"
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

const DesktopProjectsContainer = ({ isInView }: { isInView: boolean }) => {
  const [activeProject, setActiveProject] = useState(0);
  const smoothModalOptions = { damping: 20, stiffness: 200, mass: 0.5 };

  const modal = {
    x: useSpring(0, smoothModalOptions),
    y: useSpring(0, smoothModalOptions),
    scale: useSpring(0, smoothModalOptions),
  };

  useEffect(() => {
    function handleMouseMove(e: globalThis.MouseEvent) {
      const { innerWidth } = window;
      // we set the modal size to 25vw as we did in css styles
      const modalSize = innerWidth / 4;

      modal.x.set(e.clientX - modalSize / 2);
      modal.y.set(e.clientY - modalSize / 2);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="p-[5vw] relative hidden lg:block">
      <div
        className="flex flex-col"
        onMouseEnter={() => {
          modal.scale.set(1);
        }}
        onMouseLeave={() => {
          modal.scale.set(0);
        }}
      >
        {projects.map((project, index) => (
          <DesktopProjectCard
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
        className="hidden lg:block fixed top-0 left-0 w-[25vw] h-[25vw] overflow-hidden pointer-events-none z-40"
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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

      <div ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:hidden">
          {projects.map((project, index) => (
            <MobileProjectCard
              {...project}
              index={index}
              key={project.title}
              isContainerInView={isInView}
            />
          ))}
        </div>

        <DesktopProjectsContainer isInView={isInView} />
      </div>
    </div>
  );
};
