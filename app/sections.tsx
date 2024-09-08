import { About, Footer, Projects, Services, Technologies } from "@/components";
import CustomScroll from "@/components/shared/custom-scroll";
import { wait } from "@/lib";
import SectionsProvider from "@/providers/sections-provider";
import dynamic from "next/dynamic";

const Particles = dynamic(() => import("../components/particles"), {
  ssr: false,
});

const Sections = async () => {
  await wait(4800);

  return (
    <SectionsProvider>
      <CustomScroll />
      <Particles />
      <Services />
      <Technologies />
      <About />
      <Projects />
      <Footer />
    </SectionsProvider>
  );
};

export default Sections;
