import { FirstSection } from "./first-section";
import { SecondSection } from "./second-section";

const About = () => {
  // Content for website... more about me: front-end development, creative web development, 3d web development and configuration
  return (
    <section className="mt-96 lg:mt-[24vw] p-4 md:p-10">
      <FirstSection />

      <SecondSection />
    </section>
  );
};

export default About;
