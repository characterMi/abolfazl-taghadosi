"use client";

import SlideUpAnimation from "../shared/slide-up-animation";

export const HeaderDesc = () => {
  return (
    <div style={{ direction: "rtl" }} className="uppercase mt-4 lg:mt-[2vw]">
      <SlideUpAnimation
        animate={"animate"}
        text={"SOFTWARE DEVELOPER"}
        type="single-word"
        animationProps={{ delay: 4 }}
        containerClassName="font-semibold text-[6vw] sm:text-[5vw] text"
      />

      <br />

      <SlideUpAnimation
        animate={"animate"}
        text={"&copy; 2024 Abolfazl taghadosi"}
        type="single-word"
        animationProps={{ delay: 4.2 }}
        containerClassName="font-medium mt-4 sm:mt-2 lg:mt-[1vw] text-neutral-500 text-[3vw] sm:text-[1.8vw] lg:text-[1vw]"
        style={{ direction: "ltr" }}
      />
    </div>
  );
};
