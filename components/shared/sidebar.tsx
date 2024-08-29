import { sidebarItems, socials } from "@/constants";
import { fadeIn, menuSlide, pathAnimation, slide } from "@/utils/motion";
import { motion } from "framer-motion";
import Magnetic from "./magnetic";
import SlideUpLink from "./slide-up-link";

const Curve = () => (
  <svg className="absolute top-0 -left-24 w-28 h-full fill-neutral-800 stroke-none">
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

const Sidebar = () => {
  return (
    <>
      {/* Layer... */}
      <motion.div
        className="fixed left-0 top-0 w-screen h-screen z-[39] bg-gradient-to-r from-neutral-900/10 to-neutral-900"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="initial"
      />

      <motion.nav
        variants={menuSlide}
        initial="initial"
        animate="enter"
        exit="exit"
        className="fixed right-0 px-2 lg:px-[0.5vw] top-0 h-screen bg-neutral-800 text-white z-40 w-full md:w-max"
      >
        <div className="w-full h-full flex flex-col justify-between overflow-auto">
          <div className="flex flex-col text-xl gap-20 lg:gap-[5vw] mt-20 lg:mt-[5vw] p-6 smart-watch:p-10 xss:p-14 sm:p-20 lg:p-[5vw]">
            <p className="border-b pb-4 lg:pb-[1vw] w-full lg:text-[1vw]">
              Navigation
            </p>

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
                  <SlideUpLink {...item} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="py-6 px-6 smart-watch:px-10 xss:px-14 xss:pb-20 lg:pb-[5vw] sm:px-20 lg:px-[5vw] border-t xss:border-t-0 border-neutral-600 flex flex-col gap-3 lg:gap-[0.75vw]">
            <p className="text-neutral-500 text-sm lg:text-[0.875vw]">
              socials
            </p>
            <div className="flex flex-wrap gap-4 lg:gap-[1vw] items-center uppercase text-sm lg:text-[1vw]">
              {socials.map((link) => (
                <Magnetic key={link.title}>
                  <SlideUpLink {...link} />
                </Magnetic>
              ))}
            </div>
          </div>
        </div>

        <Curve />
      </motion.nav>
    </>
  );
};

export default Sidebar;
