import { AllProjects } from "./all-projects";
import { Description } from "./description";
import { MainProjects } from "./main-projects";

const Projects = () => {
  return (
    <div className="px-4 md:px-10">
      <Description />

      <MainProjects />

      <AllProjects />
    </div>
  );
};

export default Projects;
