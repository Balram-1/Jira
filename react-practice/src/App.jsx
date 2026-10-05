import ProjectCard from "./ProjectCard";
import { projects } from "./data";

function App() {
  return (
    <div>
      <h1>Projects</h1>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          name={project.name}
          issues={project.issues}
          status={project.status}
        />
      ))}
    </div>
  );
}

export default App;
