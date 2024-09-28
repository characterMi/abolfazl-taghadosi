import Particles from "@/components/particles";
import Svg from "@/components/shared/not-found-svg";
import { notFound } from "@/constants";

export const metadata = {
  title: "404 | this page could not be found.",
};

const NotFound = () => {
  return (
    <main
      data-lenis-prevent
      className="bg-black h-d-screen overflow-auto flex flex-col px-4"
    >
      <Particles notFound />

      <div className="flex-1 flex justify-center items-center relative z-10">
        {notFound.map((item, i) => (
          <Svg {...item} index={i} key={i} />
        ))}
      </div>

      <div className="flex flex-col items-center justify-start gap-5 lg:gap-[1.5vw] min-h-[20vh] uppercase">
        <h1 className="text-neutral-500 font-black xss:text-xl sm:text-2xl lg:text-[1.5vw]">
          The page you are looking for doesn&apos;t exist.
        </h1>
        <h2 className="text-neutral-600 opacity-80 text-xs xss:text-base sm:text-lg lg:text-[1vw]">
          You may have mistyped the address.
        </h2>
      </div>
    </main>
  );
};

export default NotFound;
