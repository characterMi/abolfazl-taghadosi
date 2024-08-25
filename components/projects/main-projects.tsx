"use client";

import { projects } from "@/constants";
import { fadeIn, scaleUp, slideUp } from "@/utils/motion";
import { motion, useInView } from "framer-motion";

import Image from "next/image";
import { MouseEvent, RefObject, useEffect, useRef } from "react";

type Props = {
  imgSrc: string;
  srcCode: string;
  title: string;
  year: number;
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
    if (!card.current) return;

    const { width } = card.current.getBoundingClientRect();

    const path = `M0 50 Q${width * x} ${50 + progress}, ${width} 50`;

    ref.current?.setAttributeNS("", "d", path);
  }

  function handleMouseMove(
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) {
    const { movementY, clientX } = e;
    const cliRect = ref.current?.getBoundingClientRect();
    x = cliRect ? (clientX - cliRect.left) / cliRect.width : 0.5;
    progress += movementY;
    setPath(progress);
  }

  function handleMouseLeave() {
    animateOut();
  }

  function handleMouseEnter() {
    if (reqId) {
      window.cancelAnimationFrame(reqId);
      resetAnimation();
    }
  }

  const lerp = (x: number, y: number, t: number) => x * (1 - t) + y * t;

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
        className="h-[40px] relative -top-5 z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      />
      <svg className="w-full h-[100px] absolute -top-12">
        <path ref={ref} className="stroke-[0.5] stroke-neutral-500 fill-none" />
      </svg>
    </motion.div>
  );
};

const ProjectCard = ({
  imgSrc,
  srcCode,
  title,
  year,
  index,
  isContainerInView,
}: Props) => {
  const card = useRef<HTMLAnchorElement>(null);

  return (
    <a
      href={srcCode}
      target="_blank"
      rel="noopener noreferrer"
      key={title}
      className="project-card flex flex-col gap-8"
      ref={card}
    >
      <motion.div
        className="w-full aspect-square bg-neutral-200 px-8 flex items-center group"
        variants={scaleUp}
        custom={index * 0.1}
        initial="hidden"
        animate={isContainerInView ? "visible" : ""}
        exit="hidden"
      >
        <Image
          src={imgSrc}
          alt={title}
          width={1000}
          height={1000}
          className="object-cover w-full h-auto group-hover:scale-[1.025] duration-500"
        />
      </motion.div>

      <SvgCurve
        card={card}
        index={index}
        isContainerInView={isContainerInView}
      />

      <div className="w-full flex items-center justify-between">
        <p className="text-4xl sm:text-6xl md:text-4xl font-thin slide-up-animation">
          <motion.span
            className="text-black"
            variants={slideUp}
            initial="initial"
            animate={isContainerInView ? "animate" : ""}
            exit="initial"
            custom={{
              delay: index * 0.15,
            }}
          >
            {title}
          </motion.span>
        </p>

        <p className="text-2xl sm:text-3xl md:text-2xl font-semibold slide-up-animation">
          <motion.span
            className="text-black"
            variants={slideUp}
            initial="initial"
            animate={isContainerInView ? "animate" : ""}
            exit="initial"
            custom={{
              delay: index * 0.175,
            }}
          >
            {year}
          </motion.span>
        </p>
      </div>
    </a>
  );
};

export const MainProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="mt-20">
      <div
        className="uppercase text-black text-4xl xss:text-5xl sm:text-7xl font-black mb-10 relative z-[1]"
        style={{ direction: "rtl" }}
      >
        <p className="slide-up-animation">
          <motion.span
            className="text-black"
            variants={slideUp}
            initial="initial"
            animate={isInView ? "animate" : ""}
            exit="initial"
          >
            Real world
          </motion.span>
        </p>
        <br />
        <p className="slide-up-animation">
          <motion.span
            className="gray-mark"
            variants={slideUp}
            initial="initial"
            animate={isInView ? "animate" : ""}
            exit="initial"
            custom={{
              delay: 0.1,
            }}
          >
            Projects
          </motion.span>
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12"
        ref={ref}
      >
        {projects.map((project, index) => (
          <ProjectCard
            {...project}
            index={index}
            key={project.title}
            isContainerInView={isInView}
          />
        ))}
      </div>
    </div>
  );
};
