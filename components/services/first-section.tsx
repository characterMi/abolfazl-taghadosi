"use client";

import { services } from "@/constants";
import { ease } from "@/utils/motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Motion from "../shared/motion";
import SlideUpAnimation from "../shared/slide-up-animation";

const Service = ({ desc, title }: (typeof services)[number]) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="flex flex-col gap-6 lg:gap-[1.5vw]" ref={ref}>
      <div className="flex flex-col tracking-tight text-2xl smart-watch:text-4xl lg:text-[2.25vw] font-bold uppercase">
        <span className="sr-only">{title[0] + " " + title[1]}</span>

        {title.map((word) => (
          <SlideUpAnimation
            key={word}
            animate={isInView ? "animate" : ""}
            type="single-word"
            childClassName="mark leading-none"
            animationProps={{ animate: { delay: 0.3 } }}
            isHidden
          >
            {word}
          </SlideUpAnimation>
        ))}
      </div>

      <SlideUpAnimation
        animate={isInView ? "animate" : ""}
        type="multiple-word"
        containerClassName="font-semibold text-xs smart-watch:text-base lg:text-[1vw]"
        childClassName="leading-tight"
        animationProps={(i) => ({
          animate: { delay: 0.5 + i * 0.025, duration: 0.8 },
        })}
      >
        {desc}
      </SlideUpAnimation>
    </div>
  );
};

export const FirstSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      className="min-h-max h-[250vh] md:h-[400vh] w-full lg:max-w-[65vw] mx-auto flex flex-col lg:flex-row gap-20 lg:gap-[5vw] relative"
      ref={ref}
    >
      <div className="h-max lg:h-screen flex gap-8 lg:gap-[2vw] pt-8 lg:pt-[2vw] lg:items-center uppercase lg:sticky top-0 z-10">
        <div className="text-3xl smart-watch:text-5xl xss:text-7xl sm:text-8xl lg:text-[5vw] font-black flex gap-4 xss:gap-8 lg:gap-[2vw] relative">
          <Motion
            className="h-full lg:h-[18vw] w-1 lg:w-[0.25vw] bg-primary"
            initial={{ transform: "scale(0)" }}
            animate={
              isInView
                ? {
                    transform: "scale(1)",
                    transition: { duration: 1, type: "tween", ease },
                  }
                : {}
            }
            style={{
              transformOrigin: "top",
              WebkitTransformOrigin: "top",
            }}
            aria-hidden
          />

          <div className="tracking-tighter leading-[0.8] p-4 sm:p-10 lg:p-[2.5vw] text-nowrap whitespace-nowrap">
            <span className="sr-only">Skills & Services I offer</span>

            <SlideUpAnimation
              animate={isInView ? "animate" : ""}
              type="single-word"
              animationProps={{ animate: { delay: 0.5 } }}
              isHidden
            >
              Skills &
            </SlideUpAnimation>
            <br aria-hidden />

            <SlideUpAnimation
              animate={isInView ? "animate" : ""}
              type="single-word"
              animationProps={{ animate: { delay: 0.6 } }}
              isHidden
            >
              Services
            </SlideUpAnimation>
            <br aria-hidden />

            <SlideUpAnimation
              animate={isInView ? "animate" : ""}
              type="single-word"
              animationProps={{ animate: { delay: 0.7 } }}
              childClassName="mark"
              isHidden
            >
              I offer
            </SlideUpAnimation>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-evenly gap-6 h-full">
        <SlideUpAnimation
          animate={isInView ? "animate" : ""}
          type="multiple-word"
          animationProps={(i) => ({
            animate: { delay: 1 + i * 0.025, duration: 0.8 },
          })}
          containerClassName="text-xs smart-watch:text-base lg:text-[1vw]"
          childClassName="leading-tight"
        >
          Feeling like your website isn&apos;t quite hitting the mark? I get it.
          I build unique digital experiences that truly represent your brand and
          help you connect with your audience. Let&apos;s team up and bring your
          vision to life.
        </SlideUpAnimation>

        {services.map((service, i) => (
          <Service {...service} key={i} />
        ))}
      </div>
    </div>
  );
};
