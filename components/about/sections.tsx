import { aboutContent, legends } from "@/constants";
import { fadeInWithBlur } from "@/utils/motion";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import FlipLink from "../shared/flip-link";
import SlideUpAnimation from "../shared/slide-up-animation";

export const SectionsWithAnimation = ({
  isSectionInView,
}: {
  isSectionInView: boolean;
}) => {
  const ref = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0) setActiveSection(0);

    if (latest >= 0.25) setActiveSection(1);

    if (latest >= 0.5) setActiveSection(2);

    if (latest >= 0.75) setActiveSection(3);
  });

  return (
    <div
      className="min-h-max h-[500vh] about-section__with-animation"
      ref={ref}
    >
      <div className="h-screen w-full sticky top-0 pt-6 sm:pt-12 lg:pt-[3vw] overflow-hidden">
        <SlideUpAnimation
          animate={isSectionInView ? "animate" : ""}
          type="single-word"
          childClassName="text-neutral-900 leading-[0.85]"
          containerClassName="text-4xl smart-watch:text-5xl xss:text-7xl sm:text-8xl lg:text-[6vw] font-black uppercase mb-6 sm:mb-10 lg:mb-[2.5vw]"
        >
          Who I Am?
        </SlideUpAnimation>

        {aboutContent.map((item, i) => (
          <div
            key={item.title}
            className="absolute top-[15%] sm:top-1/2 sm:-translate-y-1/2 h-[50vh]"
            style={{ zIndex: activeSection === i ? 1 : 0 }}
          >
            <SlideUpAnimation
              type="single-word"
              animate={
                isSectionInView && activeSection === i ? "animate" : "initial"
              }
              animationProps={{
                animate: { duration: 1 },
              }}
              containerClassName="text-2xl xss:text-3xl sm:text-5xl lg:text-[3vw] font-semibold mb-6 lg:mb-[1.5vw]"
              childClassName="text-neutral-900 leading-tight"
            >
              {item.title}
            </SlideUpAnimation>

            <motion.p
              className="text-neutral-900 text-lg xss:text-xl sm:text-3xl lg:text-[2vw] !leading-tight font-thin px-4 lg:px-[1vw]"
              variants={fadeInWithBlur}
              initial="initial"
              animate={
                isSectionInView && activeSection === i ? "animate" : "exit"
              }
              exit="exit"
              style={{ willChange: "filter, opacity" }}
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        ))}

        <div
          className="absolute top-[15%] sm:top-1/2 sm:-translate-y-1/2 h-[50vh]"
          style={{ zIndex: activeSection === 3 ? 1 : 0 }}
        >
          <SlideUpAnimation
            type="single-word"
            animate={activeSection === 3 ? "animate" : "initial"}
            animationProps={{
              animate: { duration: 0.8 },
              exit: { duration: 0.8 },
            }}
            containerClassName="text-2xl xss:text-3xl sm:text-5xl lg:text-[3vw] font-semibold mb-6 lg:mb-[1.5vw]"
            childClassName="text-neutral-900 leading-tight"
          >
            - Inspirations and Mentors
          </SlideUpAnimation>

          <motion.div
            className="text-neutral-900 text-lg xss:text-xl sm:text-3xl lg:text-[2vw] !leading-tight font-thin px-4 lg:px-[1vw]"
            variants={fadeInWithBlur}
            initial="initial"
            animate={activeSection === 3 ? "animate" : "exit"}
            exit="exit"
            style={{ willChange: "filter, opacity" }}
          >
            Throughout my learning journey, there have been several individuals
            who have had a profound impact on my growth as a developer. Their
            teaching, guidance, and content have inspired me and shaped my
            approach to coding. I owe much of my progress to
            {legends.map((legend, index) => {
              const lastIndex = legends.length - 1;

              return (
                <div key={legend.name} className="inline text-neutral-900">
                  {index === 0 && " "}
                  {index === lastIndex && "and "}
                  <FlipLink
                    title={legend.name}
                    link={legend.link}
                    childClassName="dark-mark"
                    containerClassName="font-bold"
                    isBlank
                  />
                  {index !== lastIndex && ", "}
                </div>
              );
            })}
            . Each of them has played a key role in helping me push my
            boundaries and explore new horizons in web development.
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const SectionsWithoutAnimation = ({
  isSectionInView,
}: {
  isSectionInView: boolean;
}) => (
  <div className="about-section__without-animation">
    <SlideUpAnimation
      animate={isSectionInView ? "animate" : ""}
      type="single-word"
      childClassName="text-neutral-900 leading-[0.85]"
      containerClassName="text-4xl smart-watch:text-5xl xss:text-7xl sm:text-8xl lg:text-[6vw] font-black uppercase mb-6 sm:mb-10 lg:mb-[2.5vw]"
    >
      Who I Am?
    </SlideUpAnimation>

    <motion.div
      variants={fadeInWithBlur}
      initial="initial"
      animate={isSectionInView ? "animate" : ""}
      exit="initial"
    >
      {aboutContent.map((item) => (
        <div key={item.title} className="mt-6 sm:mt-12 lg:mt-[3vw]">
          <p className="text-neutral-900 text-2xl xss:text-3xl sm:text-5xl lg:text-[3vw] leading-tight font-semibold mb-6 lg:mb-[1.5vw]">
            {item.title}
          </p>

          <p
            className="text-neutral-900 text-lg xss:text-xl sm:text-3xl lg:text-[2vw] !leading-tight font-thin px-4 lg:px-[1vw]"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      ))}

      <div className="my-12 lg:my-[3vw]">
        <p className="text-neutral-900 text-2xl xss:text-3xl sm:text-5xl lg:text-[3vw] leading-tight font-semibold mb-6 lg:mb-[1.5vw]">
          - Inspirations and Mentors
        </p>

        <div className="text-neutral-900 text-lg xss:text-xl sm:text-3xl lg:text-[2vw] !leading-tight font-thin p-4 lg:p-[1vw]">
          Throughout my learning journey, there have been several individuals
          who have had a profound impact on my growth as a developer. Their
          teaching, guidance, and content have inspired me and shaped my
          approach to coding. I owe much of my progress to
          {legends.map((legend, index) => (
            <div key={legend.name} className="inline text-neutral-900">
              {index === 0 && " "}
              {index === legends.length - 1 && "and "}
              <FlipLink
                title={legend.name}
                link={legend.link}
                childClassName="dark-mark"
                containerClassName="font-bold"
                isBlank
              />
              {index !== legends.length - 1 && ", "}
            </div>
          ))}
          . Each of them has played a key role in helping me push my boundaries
          and explore new horizons in web development.
        </div>
      </div>
    </motion.div>
  </div>
);
