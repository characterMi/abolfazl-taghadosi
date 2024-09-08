"use client";

import { services } from "@/constants";
import { ease } from "@/utils/motion";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SlideUpAnimation from "../shared/slide-up-animation";

const Service = ({ desc, title }: (typeof services)[number]) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="flex flex-col gap-6 lg:gap-[1.5vw]" ref={ref}>
      <div className="flex flex-col tracking-tight text-2xl smart-watch:text-4xl lg:text-[2.25vw] font-bold uppercase">
        {title.map((word) => (
          <SlideUpAnimation
            key={word}
            animate={isInView ? "animate" : ""}
            text={word}
            type="single-word"
            childClassName="mark leading-none"
          />
        ))}
      </div>

      <SlideUpAnimation
        animate={isInView ? "animate" : ""}
        text={desc}
        type="multiple-word"
        containerClassName="font-semibold text-xs smart-watch:text-base lg:text-[1vw] gap-[0.8vw] md:gap-[0.3vw]"
        childClassName="leading-tight"
        animationProps={(i) => ({
          animate: { delay: 0.2 + i * 0.025, duration: 0.8 },
        })}
      />
    </div>
  );
};

export const FirstSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const text =
    "Tired of websites that fail to engage or showcase your unique identity? I create exceptional digital experience that not only align with your brand but also drive meaningful growth for your business. Let's work together to turn your vision into reality!";

  return (
    <div
      className="min-h-max h-[250vh] md:h-[400vh] w-full lg:max-w-[65vw] mx-auto flex flex-col lg:flex-row gap-20 lg:gap-[5vw] relative"
      ref={ref}
    >
      <div className="h-max lg:h-screen flex gap-8 lg:gap-[2vw] pt-8 lg:pt-[2vw] lg:items-center uppercase sticky top-0 backdrop-blur-md lg:backdrop-blur-0 z-10">
        <div className="text-3xl smart-watch:text-5xl xss:text-7xl sm:text-8xl lg:text-[5vw] font-black flex gap-4 xss:gap-8 lg:gap-[2vw] relative">
          <motion.div
            className="h-full lg:h-[18vw] w-1 lg:w-[0.25vw] bg-primary"
            initial={{ scaleY: 0 }}
            animate={
              isInView
                ? {
                    scaleY: 1,
                    transition: { duration: 1, type: "tween", ease },
                  }
                : {}
            }
            style={{
              transformOrigin: "top",
              WebkitTransformOrigin: "top",
            }}
          />

          <div className="tracking-tighter leading-[0.8] p-4 sm:p-10 lg:p-[2.5vw] text-nowrap">
            <SlideUpAnimation
              animate={isInView ? "animate" : ""}
              text={"Skills &"}
              type="single-word"
              animationProps={{ animate: { delay: 0.5 } }}
            />
            <br />

            <SlideUpAnimation
              animate={isInView ? "animate" : ""}
              text={"Services"}
              type="single-word"
              animationProps={{ animate: { delay: 0.6 } }}
            />
            <br />

            <SlideUpAnimation
              animate={isInView ? "animate" : ""}
              text={"I offer"}
              type="single-word"
              animationProps={{ animate: { delay: 0.7 } }}
              childClassName="mark"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-evenly gap-6 h-full">
        <SlideUpAnimation
          animate={isInView ? "animate" : ""}
          text={text}
          type="multiple-word"
          animationProps={(i) => ({
            animate: { delay: 1 + i * 0.025, duration: 0.8 },
          })}
          containerClassName="text-xs smart-watch:text-base lg:text-[1vw] flex flex-wrap gap-1 lg:gap-[0.25vw]"
          childClassName="leading-tight"
        />

        {services.map((service, i) => (
          <Service {...service} key={i} />
        ))}
      </div>
    </div>
  );
};
