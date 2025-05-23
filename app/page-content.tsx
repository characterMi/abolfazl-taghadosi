"use client";

import { Hero } from "@/components";
import LazyComponents from "@/components/shared/lazy-components";
import LoadingScreen from "@/components/shared/loading-screen";
import { ease2 } from "@/utils/motion";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const PageContent = ({
  header,
  main,
  footer,
}: {
  header: JSX.Element;
  main: JSX.Element;
  footer: JSX.Element;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  return (
    <>
      <motion.div
        ref={containerRef}
        className="overflow-hidden h-sm-screen"
        initial={{
          scale: 0.5,
          rotateZ: "25deg",
          clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        }}
        animate={
          isPageLoaded && {
            scale: 1,
            rotateZ: "0deg",
            clipPath: "polygon(100% 100%, 100% 0, 0 0, 0 100%)",
            transition: {
              duration: 1,
              ease: ease2,
            },
          }
        }
        onAnimationComplete={() => {
          containerRef.current?.style.setProperty("height", "auto");
          containerRef.current?.style.setProperty("overflow", "unset");

          window.document.body.style.setProperty("cursor", "auto");
        }}
      >
        {header}

        <main>
          {/* Background */}
          <div
            className="bg-background bg-no-repeat bg-cover bg-center fixed top-0 left-0 w-screen h-screen"
            aria-hidden
          />

          {isPageLoaded && <LazyComponents />}

          <Hero isPageLoaded={isPageLoaded} />
          {main}
        </main>

        {footer}
      </motion.div>

      {!isPageLoaded && <LoadingScreen setIsPageLoaded={setIsPageLoaded} />}
    </>
  );
};

export default PageContent;
