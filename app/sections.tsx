import { About, Footer, Projects, Services, Technologies } from "@/components";
import { wait } from "@/lib";
import SectionsProvider from "@/providers/sections-provider";

const Sections = async () => {
  await wait(4800);

  return (
    <SectionsProvider>
      <Services />
      <Technologies />
      <About />
      <Projects />
      <Footer />
    </SectionsProvider>
  );
};

export default Sections;
