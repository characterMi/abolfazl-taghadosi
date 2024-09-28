"use client";

const Error = () => {
  return (
    <div className="bg-neutral-900 w-full h-screen fixed top-0 left-0 uppercase flex justify-center items-center flex-col">
      <p className="text-xl font-bold xss:text-2xl sm:text-4xl lg:text-[2.5vw]">
        tf just happened?! 💀
      </p>
      <p className="text-sm opacity-50 mt-5 text-center sm:text-lg lg:text-[1.25vw] lg:mt-[2.5vw]">
        there was an issue serving your request, try reloading the page.
      </p>
    </div>
  );
};

export default Error;
