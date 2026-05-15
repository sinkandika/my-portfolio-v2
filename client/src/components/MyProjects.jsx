import ProjectCard from "./ProjectCard";


function MyProjects ({ projects, loading }) {
  

  return (
    <div
    id="myPortfolio"
    className="relative bg-white p-10 md:p-40 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] flex flex-col gap-y-10 z-96"
    >
      <p className="text-2xl text-hero">
        My Projects
      </p>
      <div>
        {loading ? (
          <div className="flex flex-col justify-center items-center py-10 gap-4">
            <div className="w-12 h-12 rounded-full border-fourth border-t-hero border-4 animate-[spin_0.5s_linear_infinite] "></div>
            <p>Loading my projects.... </p>
          </div>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyProjects;