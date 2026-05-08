import { useEffect, useState } from "react";
import { createProject, deleteProject, getAllProjects, updateProject } from "../services/projectService";
import ViewProject from "../components/projects/ViewProject";
import CreateProject from "../components/projects/CreateProject";
import EditProjectModal from "../components/projects/EditProjectModal";


function DashboardAdmin () {
  const [projects, setProjects] = useState([]); // fetch project
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // create modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // edit modal
  const [selectedProject, setSelectedProject] = useState(null);

  // fetch projects
  const fetchProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch projects");
    }
  };

  // handle create project
  const handleCreateProject = async (projData) => {
    try {
      await createProject(projData);
      alert("Project created!");
      fetchProjects();
    } catch (err) {
      console.log(err)
      alert("failed to created project");
    }
  };

  // open edit modal
  const handleOpenEdit = (project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  // handle update project
  const handleUpdateProject = async (id, data) => {
    try {
      await updateProject (id, data);
      alert("Updated!");
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  // handle delete project
  const handleDeleteProject = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete this project?");
      if (!confirmDelete) return;

      await deleteProject(id);

      alert("Project deleted!");
      fetchProjects();
    } catch (err) {
      console.log(err);
      alert("Failed to delete project");
    }
  };

  useEffect (() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <p> this is dashboard admin</p>
      <button
      onClick={() => setIsCreateModalOpen(true)}
      className="border"
      >
        add project
      </button>
      <div>
        {projects.length > 0 ? (
          projects.map((proj) => (
            <ViewProject
            key={proj.id}
            project={proj}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteProject}
            />
          ))
        ) : (
          <p>No project found</p>
        )}
      </div>
      {/* create modal */}
      <CreateProject
      isOpen={isCreateModalOpen}
      onClose={() => setIsCreateModalOpen(false)}
      onCreate={handleCreateProject} 
      />
      <EditProjectModal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      onUpdate={handleUpdateProject}
      project={selectedProject}
      />

    </div>
  );
}

export default DashboardAdmin;