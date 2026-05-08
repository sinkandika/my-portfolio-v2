import ProjectCard from "./ProjectCard";


function MyProjects ({ projects }) {


  return (
    <div
    id="myPortfolio"
    className="relative bg-white p-10 md:p-40 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] flex flex-col gap-y-10 z-96"
    >
      <p className="text-2xl text-hero">
        My Projects
      </p>
      <div>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </div>
  );
};

export default MyProjects;