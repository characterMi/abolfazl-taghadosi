import FlipLink from "@/components/shared/flip-link";
import Magnetic from "@/components/shared/magnetic";
import SlideUpAnimation from "@/components/shared/slide-up-animation";
import { sidebarItems, socials } from "@/constants";
import {
  fadeIn,
  menuContainerSlide,
  menuSlide,
  pathAnimation,
  slide,
} from "@/utils/motion";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { Dispatch, SetStateAction, useEffect } from "react";

const Curve = () => (
  <svg
    className="absolute top-0 -left-24 w-28 h-full fill-neutral-800 stroke-none"
    aria-hidden
  >
    <motion.path
      variants={pathAnimation(
        `M100 0 L100 ${window.innerHeight} Q-100 ${
          window.innerHeight / 2
        } 100 0`,
        `M100 0 L100 ${window.innerHeight} Q100 ${window.innerHeight / 2} 100 0`
      )}
      initial="initial"
      animate="enter"
      exit="exit"
    />
  </svg>
);

const Sidebar = ({
  setIsMenuActive,
}: {
  setIsMenuActive: Dispatch<SetStateAction<boolean>>;
}) => {
  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();

    const links = document.querySelectorAll<HTMLAnchorElement>(".sidebar-link");
    const handleScrollToSection = (e: MouseEvent) => {
      e.preventDefault();

      // @ts-expect-error: if we change the event type, it's going to give us another error...
      const targetId = e.currentTarget?.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop;

        lenis?.scrollTo(offsetTop);

        setIsMenuActive(false);
      }
    };

    links.forEach((element) => {
      element.addEventListener("click", handleScrollToSection);
    });

    return () => {
      lenis?.start();
      links.forEach((element) => {
        element.removeEventListener("click", handleScrollToSection);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        className="hidden md:block fixed left-0 top-0 w-screen h-screen z-[39] bg-gradient-to-r from-neutral-900/10 to-neutral-900"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="initial"
        onClick={() => setIsMenuActive(false)}
        aria-hidden
      />

      <motion.aside
        variants={menuSlide}
        initial="initial"
        animate="enter"
        exit="exit"
        className="fixed right-0 px-2 lg:px-[0.5vw] top-0 h-d-screen bg-gradient-to-r from-neutral-800 to-[#1f1f1f] text-white z-40 w-full md:w-max"
        id="sidebar"
      >
        <motion.nav
          data-lenis-prevent
          className="w-full h-full flex flex-col justify-between overflow-y-auto overflow-x-hidden"
          variants={menuContainerSlide}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <div className="flex flex-col text-xl gap-20 lg:gap-[5vw] mt-20 lg:mt-[5vw] p-6 smart-watch:p-10 xss:p-14 sm:p-20 lg:p-[5vw]">
            <SlideUpAnimation
              containerClassName="border-b pb-4 lg:pb-[1vw] w-full text-4xl lg:text-[2.5vw] font-FF tracking-wider"
              animate="animate"
              type="single-word"
              animationProps={{
                animate: { duration: 0.8, delay: 0.5 },
                exit: { duration: 0.8 },
              }}
            >
              Navigation
            </SlideUpAnimation>

            <div className="flex flex-col gap-3 lg:gap-[0.75vw] text-4xl lg:text-[3vw] font-thin">
              {sidebarItems.map((item, index) => (
                <motion.div
                  variants={slide}
                  custom={index}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  key={item.title}
                >
                  <FlipLink {...item} containerClassName="sidebar-link" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="py-6 px-6 smart-watch:px-10 xss:px-14 xss:pb-20 lg:pb-[5vw] sm:px-20 lg:px-[5vw] border-t xss:border-t-0 border-neutral-600 flex flex-col gap-3 lg:gap-[0.75vw]">
            <p
              className="text-neutral-500 text-sm lg:text-[0.875vw]"
              id="socials"
            >
              socials
            </p>
            <div
              className="flex flex-wrap gap-4 lg:gap-[1vw] items-center uppercase text-sm lg:text-[1vw]"
              aria-labelledby="socials"
            >
              {socials.map((link) => (
                <Magnetic key={link.title}>
                  <FlipLink {...link} isBlank />
                </Magnetic>
              ))}
            </div>
          </div>
        </motion.nav>

        <Curve />
      </motion.aside>
    </>
  );
};

export default Sidebar;
