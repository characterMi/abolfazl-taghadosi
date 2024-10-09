import {
  About,
  Footer,
  Header,
  Hero,
  Projects,
  Services,
  Technologies,
} from "@/components";
import CustomScroll from "@/components/shared/custom-scroll";
import dynamic from "next/dynamic";

const Particles = dynamic(() => import("../components/particles"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Background */}
        <div className="bg-background bg-no-repeat bg-cover bg-center fixed top-0 left-0 w-screen h-screen" />

        <CustomScroll />
        <Particles />

        <Hero />
        <Services />
        <Technologies />
        <About />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
