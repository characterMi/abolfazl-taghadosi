import { About, Footer, Hero, Projects, Technologies } from "@/components";
import CustomScroll from "@/components/shared/custom-scroll";
import { wait } from "@/lib";
import ComponentsProvider from "@/providers/lazy-components-provider";
import { Suspense } from "react";

const Components = async () => {
  await wait(4800);

  return (
    <ComponentsProvider>
      <About />
      <Technologies />
      <div className="bg-white relative overflow-hidden">
        <Projects />
        <Footer />
      </div>
    </ComponentsProvider>
  );
};

export default function Home() {
  return (
    <main className="bg-black">
      {/* Background */}
      <div className="bg-background bg-no-repeat bg-cover bg-center fixed top-0 left-0 w-screen h-screen" />

      <div className="w-full h-full relative">
        <Hero />
        {/* <Model /> */}
        <CustomScroll />

        <Suspense fallback={null}>
          <Components />
        </Suspense>
      </div>
    </main>
  );
}
