"use client";

import { slideUp } from "@/utils/motion";
import { motion } from "framer-motion";

export const HeaderDesc = () => {
  return (
    <div style={{ direction: "rtl" }} className="uppercase mt-4">
      <h2 className="font-semibold text-[6vw] h-[6vw] sm:text-[5vw] sm:h-[5vw] text slide-up-animation">
        <motion.span
          custom={{ duration: 1.2, delay: 4 }}
          variants={slideUp}
          initial="initial"
          animate="animate"
          exit="initial"
        >
          FRONT-END DEVELOPER
        </motion.span>
      </h2>
      <br />
      <h5 className="font-medium mt-4 sm:mt-2 text-gray-400 text-[3vw] sm:text-[1.8vw] lg:text-[1vw] h-[3.5vw] sm:h-[2.3vw] lg:h-[1.5vw] slide-up-animation">
        <motion.span
          custom={{ duration: 1.2, delay: 4.2 }}
          variants={slideUp}
          initial="initial"
          animate="animate"
          exit="initial"
          style={{ direction: "ltr" }}
        >
          &copy; {new Date().getFullYear()} Abolfazl taghadosi
        </motion.span>
      </h5>
    </div>
  );
};
