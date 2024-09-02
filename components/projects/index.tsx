import { AllProjects } from "./all-projects";
import { Description } from "./description";
import { MainProjects } from "./main-projects";

const Projects = () => {
  return (
    <section
      className="px-4 md:px-10 lg:px-[2.5vw] pb-96 lg:pb-[30vw] overflow-hidden bg-white"
      id="works"
    >
      <Description />

      <MainProjects />

      <AllProjects />
    </section>
  );
};

export default Projects;
