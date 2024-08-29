import { allTech } from "@/constants";
import { ScaleValues } from "@/types";
import { motion, MotionValue, useTransform } from "framer-motion";
import Image from "next/image";

export const TechImages = ({ scrollY }: { scrollY: MotionValue<number> }) => {
  const scaleValues: ScaleValues = {
    scale2: useTransform(scrollY, [0, 1], [0.2, 2]),
    scale4: useTransform(scrollY, [0, 1], [0.15, 4]),
    scale5: useTransform(scrollY, [0, 1], [0.1, 5]),
    scale7: useTransform(scrollY, [0, 1], [0.07, 7]),
    scale8: useTransform(scrollY, [0, 1], [0.06, 8]),
    scale9: useTransform(scrollY, [0, 1], [0.05, 9]),
  };

  const opacity = useTransform(scrollY, [0, 0.025], [0, 1]);

  return allTech(scaleValues).map((tech, index) => (
    <motion.div
      className="w-[200%] md:w-full h-full absolute top-0 -left-1/2 md:left-0"
      key={tech.imgSrc}
      style={{ scale: tech.scale, opacity }}
    >
      <div className={`relative image-container__${index + 1}`}>
        <Image
          src={tech.imgSrc}
          alt={tech.label}
          width={25}
          height={25}
          className="object-cover w-auto h-full"
          style={{
            filter: `drop-shadow(${tech.shadow})`,
            msFilter: `drop-shadow(${tech.shadow})`,
            WebkitFilter: `drop-shadow(${tech?.shadow})`,
          }}
        />
      </div>
    </motion.div>
  ));
};
