import {
  About,
  Footer,
  Header,
  Projects,
  Services,
  Technologies,
} from "@/components";
import PageContent from "./page-content";

export default function Home() {
  return (
    <PageContent
      header={<Header />}
      main={
        <>
          <Services />
          <Technologies />
          <About />
          <Projects />
        </>
      }
      footer={<Footer />}
    />
  );
}
