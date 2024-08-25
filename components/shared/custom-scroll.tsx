"use client";

import { useEffect, useRef } from "react";

const CustomScroll = () => {
  const customScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (customScroll.current) {
        const scrollY = window.scrollY;
        const documentHeight = document.body.clientHeight;
        const windowHeight = window.innerHeight;

        const scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100;
        customScroll.current.style.width = `${scrollPercent}%`;
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={customScroll} className="fixed top-0 left-0 h-1 bg-pink z-50" />
  );
};

export default CustomScroll;
