import { motion } from "framer-motion";
import { useState } from "react";
function ProjectCard ({ project }) {

  const [isHover, setIsHover] = useState(false);
  return (
      <motion.div
      initial={{ opacity: 0, x:-100}}
      whileInView={{ opacity: 1, x: 0}}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex justify-between gap-10 flex-col-reverse md:flex-col  xl:flex-row py-10 min-w-md"
      >
      <div className="flex flex-1 flex-col">
        <p className="text-secondary">
          {project.technologies}
        </p>
        <p
        style={{
          color: project.title_color
        }}
        className="text-3xl"
        >
          {project.title}
        </p>
        <p className="text-secondary min-w-sm">
          {project.description}
        </p>
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
            Check it out!
          </a>
        )}

      </div>
      <div className="flex flex-1 justify-center md:justify-end">
        <img 
        src={project.images[0].image_url} 
        alt={project.title} 
        className="w-xl min-w-sm"
        />
      </div>
      </motion.div>
  );
};

export default ProjectCard;