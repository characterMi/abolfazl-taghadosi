import { ease2 } from "@/utils/motion";
import { motion, useAnimationFrame } from "framer-motion";
import { Dispatch, SetStateAction, useRef, useState } from "react";

const WelcomeAnimation = ({
  isLoadingAnimationCompleted,
}: {
  isLoadingAnimationCompleted: boolean;
}) => {
  const transition = (i: number = 0, times: number[] = [0, 0.05, 0.95, 1]) => ({
    duration: 4,
    delay: 1 + i * 0.05,
    times,
    ease: ease2,
  });

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
      <h1 className="font-FF text-[30vw] sm:text-[25vw] md:text-[20vw] lg:text-[15vw] text-nowrap">
        {/* For accessibility */}
        <span className="sr-only" aria-live="polite">
          {isLoadingAnimationCompleted && "WELCOME"}
        </span>

        {"WELCOME".split("").map((letter, i) => (
          <motion.span
            aria-hidden
            key={i}
            initial={{
              scale: 1.2,
            }}
            animate={
              isLoadingAnimationCompleted && {
                scale: [1.2, 1, 1, 1],
              }
            }
            transition={transition(i, [0, 0.4, 0.6, 1])}
            className="inline-block"
          >
            <motion.span
              initial={{
                filter: "blur(10px)",
                opacity: 0,
                clipPath: "inset(100% 0 0 0)",
              }}
              animate={
                isLoadingAnimationCompleted && {
                  clipPath: [
                    "inset(100% 0 0 0)",
                    "inset(0 0 0 0)",
                    "inset(0 0 0 0)",
                    "inset(0 0 100% 0)",
                  ],
                  filter: [
                    "blur(10px)",
                    "blur(0px)",
                    "blur(0px)",
                    "blur(10px)",
                  ],
                  opacity: [0, 1, 1, 0],
                }
              }
              transition={transition(i)}
            >
              {letter}
            </motion.span>
          </motion.span>
        ))}
      </h1>
    </div>
  );
};

const LoadingScreen = ({
  setIsPageLoaded,
}: {
  setIsPageLoaded: Dispatch<SetStateAction<boolean>>;
}) => {
  const prevTime = useRef(1000);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const loadingSteps = ["00", "33", "66", "99"];
  const maxIndex = loadingSteps.length;
  const isLoadingAnimationCompleted = loadingIndex === maxIndex;

  // 0, 33, 66, 99
  const rawLoadingPercentage = loadingSteps[loadingIndex];

  useAnimationFrame((time) => {
    if (loadingIndex > maxIndex) return;

    // as soon as the time reaches the 2000, the animation runs.
    if (time - prevTime.current > 1000) {
      prevTime.current = time;
      setLoadingIndex((prev) => prev + 1);
    }
  });

  return (
    <div className="size-full overflow-hidden fixed top-0 left-0 z-50 select-none">
      {/* Two screens */}
      <motion.div
        aria-hidden
        className="absolute top-0 left-0 h-full bg-neutral-800 w-[calc(50%+0.5px)]"
        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
        animate={
          isLoadingAnimationCompleted && {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            transition: { delay: 6.4, ease: ease2, duration: 0.6 },
          }
        }
        onAnimationComplete={() => setIsPageLoaded(true)}
      />
      <motion.div
        aria-hidden
        className="absolute top-0 right-0 h-full bg-neutral-800 w-[calc(50%+0.5px)]"
        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
        animate={
          isLoadingAnimationCompleted && {
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: { delay: 6.4, ease: ease2, duration: 0.6 },
          }
        }
      />

      {/* Horizontal line */}
      <motion.div
        aria-hidden
        className="absolute top-0 left-1/2 translate-x-1/2 w-[1px] h-full bg-white"
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
              duration: 0.8,
              delay: 5.2,
              times: [0, 0.1, 0.9, 1],
              ease: "circInOut",
            },
          },
        }}
        initial="hidden"
        animate={isLoadingAnimationCompleted && "animate"}
      />

      <WelcomeAnimation
        isLoadingAnimationCompleted={isLoadingAnimationCompleted}
      />

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
            aria-hidden
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
        <p
          className="text-neutral-400 text-[10vw] md:text-[5vw] flex justify-center items-center"
          aria-live="assertive"
        >
          <span className="sr-only">{loadingSteps[loadingIndex]}</span>%
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-[5%] left-1/2 -translate-x-1/2 font-FF tracking-wide text-[10vw] xss:text-[8vw] sm:text-[5vw]"
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
