import {
  About,
  Footer,
  Hero,
  Projects,
  Services,
  Technologies,
} from "@/components";
import ContentProvider from "@/providers/content-provider";
import dynamic from "next/dynamic";

const Particles = dynamic(() => import("../components/particles"), {
  ssr: false,
});

export default function Home() {
  const hero = (
    <>
      <Hero />
      <Particles />
    </>
  );

  return (
    <ContentProvider heroSection={hero}>
      <Services />
      <Technologies />
      <About />
      <Projects />
      <Footer />
    </ContentProvider>
  );
}
