"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import {
  type Dispatch,
  type MouseEvent,
  type RefObject,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { projects } from "@/constants";
import { lerp } from "@/lib";
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
  const ref = useRef<SVGPathElement>(null);
  let progress = 0;
  let time = Math.PI / 2;
  let reqId: number | null = null;
  let x = 0.5;

  function setPath(progress: number) {
    if (!card.current || !ref.current) return;

    const { width } = card.current.getBoundingClientRect();

    const path = `M0 50 Q${width * x} ${50 + progress}, ${width} 50`;

    ref.current.setAttributeNS("", "d", path);
  }

  function handleMouseMove(
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) {
    if (!ref.current) return;

    const { movementY, clientX } = e;
    const cliRect = ref.current.getBoundingClientRect();
    x = (clientX - cliRect.left) / cliRect.width;
    progress += movementY;
    setPath(progress);
  }

  function handleMouseEnter() {
    if (reqId) {
      window.cancelAnimationFrame(reqId);
      resetAnimation();
    }
  }

  function animateOut() {
    const newProgress = progress * Math.sin(time);
    time += 0.2;
    setPath(newProgress);
    progress = lerp(progress, 0, 0.025);

    if (Math.abs(progress) > 0.75) {
      reqId = window.requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  }

  function resetAnimation() {
    time = Math.PI / 2;
    progress = 0;
  }

  useEffect(() => {
    setPath(progress);
  }, []);

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
    >
      <div
        className="h-[40px] lg:h-[2.5vw] relative -top-5 z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={animateOut}
        onMouseEnter={handleMouseEnter}
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
  index,
  isContainerInView,
}: Props) => {
  const card = useRef<HTMLAnchorElement>(null);

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
    >
      <div className="w-full aspect-square bg-neutral-200 px-8 flex items-center group">
        <Image
          src={imgSrc}
          alt={title}
          width={1000}
          height={1000}
          className="object-cover w-full h-auto group-hover:scale-[1.025] group-focus:scale-[1.025] duration-500"
          placeholder="blur"
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
          text={title}
          type="single-word"
          animationProps={{ animate: { delay: index * 0.15 } }}
          childClassName="text-neutral-900 leading-snug"
          containerClassName="text-4xl sm:text-6xl md:text-4xl font-thin"
        />

        <SlideUpAnimation
          animate={isContainerInView ? "animate" : ""}
          text={year.toString()}
          type="single-word"
          animationProps={{ animate: { delay: index * 0.175 } }}
          childClassName="text-neutral-900"
          containerClassName="text-2xl sm:text-3xl md:text-2xl font-semibold"
        />
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
    >
      <div className="flex justify-between items-center w-full py-[2.5vw] px-[5vw] group-hover:opacity-40 group-focus:opacity-40 duration-500">
        <SlideUpAnimation
          animate={isContainerInView ? "animate" : ""}
          text={title}
          type="single-word"
          animationProps={{ animate: { delay: index * 0.15 } }}
          childClassName="text-neutral-900 leading-normal"
          containerClassName="text-[5vw] font-thin group-hover:-translate-x-[1vw] group-focus:-translate-x-[1vw] duration-500"
        />

        <SlideUpAnimation
          animate={isContainerInView ? "animate" : ""}
          text={year.toString()}
          type="single-word"
          animationProps={{ animate: { delay: index * 0.175 } }}
          childClassName="text-neutral-900"
          containerClassName="text-[2vw] font-thin opacity-80 group-hover:translate-x-[1vw] group-focus:translate-x-[1vw] duration-500"
        />
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
    x: useMotionValue(0),
    y: useMotionValue(0),
    scale: useMotionValue(0),
  };

  const smoothModal = {
    x: useSpring(modal.x, smoothModalOptions),
    y: useSpring(modal.y, smoothModalOptions),
    scale: useSpring(modal.scale, smoothModalOptions),
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
        className="hidden lg:block fixed top-0 left-0 w-[25vw] h-[25vw] overflow-hidden pointer-events-none z-40"
        style={{
          left: smoothModal.x,
          top: smoothModal.y,
          scale: smoothModal.scale,
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
              width={1000}
              height={1000}
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
      >
        <SlideUpAnimation
          animate={isInView ? "animate" : ""}
          text={"Real world"}
          type="single-word"
          childClassName="text-neutral-900"
        />

        <br />

        <SlideUpAnimation
          animate={isInView ? "animate" : ""}
          text={"Projects"}
          type="single-word"
          animationProps={{ animate: { delay: 0.1 } }}
          childClassName="gray-mark"
        />
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
