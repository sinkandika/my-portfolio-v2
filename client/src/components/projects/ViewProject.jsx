import { useState } from "react";

function ViewProjects ({ project, onEdit, onDelete }) {

  const [currentImage, setCurrentImage] = useState(0);
  const [isHover, setIsHover] = useState(false);

  // slide image
  const nextImage = () => {
    if (!project.images || project.images.length === 0) return;

    setCurrentImage((prev) =>
      prev === project.images.length - 1 ? - 0 : prev + 1 
    );
  };

  const prevImage = () => {
    if (!project.images || project.images.length === 0) return;

    setCurrentImage((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="border">
      <p
      style={{
        color: project.title_color
      }}
      >
        {project.title}
      </p>
      <p>desc: {project.description}</p>
      <p>tech: {project.technologies}</p>

      {project.images && project.images.length > 0 && (
        <div>
          <img
            src={project.images[currentImage].image_url} // projects/project-images/id
            alt={project.title}
          />
          <button
          onClick={prevImage}
          >
            prev
          </button>
          <button
          onClick={nextImage}
          >
            next
          </button>
          <p>
            {currentImage + 1} / {project.images.length}
          </p>
        </div>
      )}
      {project.live_link && (
        <a
          href={project.live_link}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={{
            color: isHover
              ? "#2F3142"
              : project.hover_color
          }}
          className="transition duration-300"
        >
          Visit Project
        </a>
      )}

      <p>featured? {project.is_featured ? "Yes" : "No"}</p>

      <button
        onClick={() => onEdit(project)}
        className="border"
      >
        Edit
      </button>
      <button
      onClick={() => onDelete(project.id)}
      className="border"
      >
        Delete
      </button>
    </div>
  );
}

export default ViewProjects;