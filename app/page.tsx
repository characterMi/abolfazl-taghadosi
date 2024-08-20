import { About, Footer, Hero, Projects, Technologies } from "@/components";
import { wait } from "@/lib";
import { Suspense } from "react";

const Components = async () => {
  await wait(4800);

  return (
    <section>
      <About />
      <Technologies />
      <div className="bg-white relative">
        <Projects />
        <Footer />
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <main className="bg-black">
      {/* Background */}
      <div className="bg-background bg-no-repeat bg-cover bg-center fixed top-0 left-0 w-screen h-screen" />

      <div className="w-full h-full relative">
        <Hero />
        {/* <Cursor /> */}
        {/* <Model /> */}
        {/* <CustomScroll /> */}

        <Suspense fallback={null}>
          <Components />
        </Suspense>
      </div>
    </main>
  );
}
