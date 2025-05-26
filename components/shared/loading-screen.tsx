import { ease2 } from "@/utils/motion";
import { motion, useAnimationFrame } from "framer-motion";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { WelcomeTextSvgEN, WelcomeTextSvgFA } from "./welcome-text-svg";

const LoadingScreen = ({
  setIsPageLoaded,
}: {
  setIsPageLoaded: Dispatch<SetStateAction<boolean>>;
}) => {
  const prevTime = useRef(performance.now());
  const [loadingIndex, setLoadingIndex] = useState(0);
  const loadingSteps = ["00", "33", "66", "99"];
  const maxIndex = loadingSteps.length;
  const isLoadingAnimationCompleted = loadingIndex === maxIndex;

  // 0, 33, 66, 99
  const rawLoadingPercentage = loadingSteps[loadingIndex];

  useAnimationFrame((time) => {
    if (loadingIndex > maxIndex) return;

    if (time - prevTime.current > 1000) {
      prevTime.current = time;
      setLoadingIndex((prev) => prev + 1);
    }
  });

  return (
    <div className="size-full overflow-hidden fixed top-0 left-0 z-50 select-none">
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-neutral-800"
        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
        animate={
          isLoadingAnimationCompleted && {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            transition: { delay: 6, ease: ease2, duration: 0.6 },
          }
        }
        onAnimationComplete={() => setIsPageLoaded(true)}
      />
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-neutral-800"
        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
        animate={
          isLoadingAnimationCompleted && {
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: { delay: 6, ease: ease2, duration: 0.6 },
          }
        }
      />

      <motion.div
        aria-hidden
        className="absolute top-0 left-1/2 translate-x-1/2 h-full w-[0.1vw] bg-white"
        variants={{
          hidden: { clipPath: "inset(0 0 100% 0)" },
          animate: {
            clipPath: [
              "inset(0 0 100% 0)",
              "inset(0 0 0 0)",
              "inset(0 0 0 0)",
              "inset(100% 0 0 0)",
            ],
            transition: {
              duration: 4.8,
              delay: 1.2,
              times: [0, 0.1, 0.9, 1],
              ease: "circInOut",
            },
          },
        }}
        initial="hidden"
        animate={isLoadingAnimationCompleted && "animate"}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 gap-12 xl:gap-16 overflow-hidden">
        <motion.div
          variants={{
            hidden: { transform: "translateY(-120%)" },
            animate: {
              transform: [
                "translateY(-120%)",
                "translateY(0)",
                "translateY(0)",
                "translateY(120%)",
              ],
              transition: {
                duration: 4,
                delay: 1.4,
                times: [0, 0.1, 0.95, 1],
                ease: "circInOut",
              },
            },
          }}
          initial="hidden"
          animate={isLoadingAnimationCompleted && "animate"}
        >
          <WelcomeTextSvgEN />
        </motion.div>

        <motion.div
          variants={{
            hidden: { transform: "translateY(120%)" },
            animate: {
              transform: [
                "translateY(120%)",
                "translateY(0%)",
                "translateY(0%)",
                "translateY(-120%)",
              ],
              transition: {
                duration: 4,
                delay: 1.4,
                times: [0, 0.1, 0.95, 1],
                ease: "circInOut",
              },
            },
          }}
          initial="hidden"
          animate={isLoadingAnimationCompleted && "animate"}
        >
          <WelcomeTextSvgFA />
        </motion.div>
      </div>

      <motion.div
        className="absolute top-1/3 -translate-y-1/3 left-1/2 -translate-x-1/2 flex h-[35vw] xss:h-[25vw] md:h-[15vw] leading-[1] overflow-hidden"
        animate={
          isLoadingAnimationCompleted && {
            opacity: 0,
            transition: { delay: 0.3, duration: 0.4 },
          }
        }
      >
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="flex flex-col"
            animate={{
              transform: `translateY(-${loadingIndex * 100}%)`,
              transition: { delay: Math.abs(index - 3) * 0.05 },
            }}
          >
            {loadingSteps.map((item) => (
              <span
                key={item}
                className="text-[35vw] xss:text-[25vw] md:text-[15vw] font-extrabold"
              >
                {item[index]}
              </span>
            ))}
          </motion.div>
        ))}
        <p className="text-neutral-400 text-[10vw] md:text-[5vw] flex justify-center items-center">
          %
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-[5%] left-1/2 -translate-x-1/2 font-FF tracking-widest text-[10vw] xss:text-[8vw] sm:text-[5vw]"
        animate={
          isLoadingAnimationCompleted && {
            opacity: 0,
            transition: { delay: 0.4, duration: 0.4 },
          }
        }
      >
        <p className="opacity-50">Loading...</p>
        <motion.p
          aria-hidden
          className="absolute top-0 left-0 select-none"
          initial={{
            clipPath: `inset(0 ${100 - Number(rawLoadingPercentage)}% 0 0)`,
          }}
          animate={{
            clipPath: `inset(0 ${100 - Number(rawLoadingPercentage)}% 0 0)`,
          }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
