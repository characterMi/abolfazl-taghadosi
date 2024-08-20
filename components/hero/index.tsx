import { screenVariant } from "@/utils/motion";
import GithubLink from "../shared/github-link";
import { MotionDiv } from "../shared/motion-div";
import { HeaderTitle } from "./header-title";

const Hero = () => {
  return (
    <section className="h-screen">
      <MotionDiv
        className="bg-pink w-full h-screen absolute"
        variants={screenVariant}
        initial="initial"
        animate="animate"
      />

      <div>
        <HeaderTitle />
        <h2>FRONT-END DEVELOPER</h2>
        <p>&copy; {new Date().getFullYear()} Abolfazl taghadosi</p>
      </div>

      <div>
        <div>
          <div>
            <div />
            Scroll <br />
            To Explode.
          </div>

          <h3>
            Skilled web developer in creating dynamic and responsive user
            interfaces, with experience in languages such as TypeScript and
            JavaScript, and expertise in modern web technologies like React,
            Next.js, Tailwindcss and Three.js. Let&apos;s work together to bring
            your ideas to Life!
          </h3>
        </div>

        <GithubLink />
      </div>
    </section>
  );
};

export default Hero;
