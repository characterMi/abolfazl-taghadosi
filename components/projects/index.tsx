import { Description } from "./description";
import { LessImportantProjects } from "./less-important-projects";
import { MainProjects } from "./main-projects";

const Projects = () => {
  return (
    <div className="px-4 md:px-10">
      <Description />

      <MainProjects />

      <LessImportantProjects />
    </div>
  );
};

export default Projects;
