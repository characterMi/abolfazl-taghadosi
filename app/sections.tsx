import { About, Footer, Projects, Services, Technologies } from "@/components";
import { wait } from "@/lib";
import SectionsProvider from "@/providers/sections-provider";
import dynamic from "next/dynamic";

const Model = dynamic(() => import("../components/model"), { ssr: false });

const Sections = async () => {
  await wait(4800);

  return (
    <SectionsProvider>
      <Model />
      <Services />
      <Technologies />
      <About />
      <Projects />
      <Footer />
    </SectionsProvider>
  );
};

export default Sections;
