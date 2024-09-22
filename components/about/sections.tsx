import { aboutContent, legends } from "@/constants";
import { fadeInWithBlur } from "@/utils/motion";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import SlideUpAnimation from "../shared/slide-up-animation";
import SlideUpLink from "../shared/slide-up-link";

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

    if (latest >= 0.3) setActiveSection(1);

    if (latest >= 0.6) setActiveSection(2);

    if (latest >= 0.9) setActiveSection(3);
  });

  return (
    <div
      className="min-h-max h-[500vh] about-section__with-animation"
      ref={ref}
    >
      <div className="h-screen w-full sticky top-0 pt-6 sm:pt-12 lg:pt-[3vw] overflow-hidden">
        <SlideUpAnimation
          animate={isSectionInView ? "animate" : ""}
          text={"Who I Am?"}
          type="single-word"
          childClassName="text-neutral-900 leading-[0.85]"
          containerClassName="text-4xl smart-watch:text-5xl xss:text-7xl sm:text-8xl lg:text-[6vw] font-black uppercase mb-6 sm:mb-10 lg:mb-[2.5vw]"
        />

        {aboutContent.map((item, i) => (
          <div
            key={item.title}
            className="absolute top-1/2 -translate-y-1/2 h-[50vh]"
            style={{ zIndex: activeSection === i ? 1 : 0 }}
          >
            <SlideUpAnimation
              type="single-word"
              text={item.title}
              animate={
                isSectionInView && activeSection === i ? "animate" : "initial"
              }
              animationProps={{
                animate: { duration: 1 },
              }}
              containerClassName="text-2xl xss:text-3xl sm:text-5xl lg:text-[3vw] font-semibold mb-6 lg:mb-[1.5vw]"
              childClassName="text-neutral-900 leading-tight"
            />

            <motion.p
              className="text-neutral-900 text-lg xss:text-xl sm:text-3xl lg:text-[2vw] !leading-tight font-thin px-4 lg:px-[1vw]"
              variants={fadeInWithBlur}
              initial="initial"
              animate={
                isSectionInView && activeSection === i ? "animate" : "initial"
              }
              exit="initial"
            >
              {item.content}
            </motion.p>
          </div>
        ))}

        <div
          className="absolute top-1/2 -translate-y-1/2 h-[50vh]"
          style={{ zIndex: activeSection === 3 ? 1 : 0 }}
        >
          <SlideUpAnimation
            type="single-word"
            text={"- Inspirations and Mentors"}
            animate={activeSection === 3 ? "animate" : "initial"}
            animationProps={{
              animate: { duration: 0.8 },
              exit: { duration: 0.8 },
            }}
            containerClassName="text-2xl xss:text-3xl sm:text-5xl lg:text-[3vw] font-semibold mb-6 lg:mb-[1.5vw]"
            childClassName="text-neutral-900 leading-tight"
          />

          <motion.div
            className="text-neutral-900 text-lg xss:text-xl sm:text-3xl lg:text-[2vw] !leading-tight font-thin px-4 lg:px-[1vw]"
            variants={fadeInWithBlur}
            initial="initial"
            animate={activeSection === 3 ? "animate" : "initial"}
            exit="initial"
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
                  <SlideUpLink
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
      text={"Who I Am?"}
      type="single-word"
      childClassName="text-neutral-900 leading-[0.85]"
      containerClassName="text-4xl smart-watch:text-5xl xss:text-7xl sm:text-8xl lg:text-[6vw] font-black uppercase mb-6 sm:mb-10 lg:mb-[2.5vw]"
    />

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

          <p className="text-neutral-900 text-lg xss:text-xl sm:text-3xl lg:text-[2vw] !leading-tight font-thin px-4 lg:px-[1vw]">
            {item.content}
          </p>
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
              <SlideUpLink
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
