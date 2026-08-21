import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImagePreviewModal from "./ImagePreviewModal";

function ProjectCard ({ project }) {

  const [isHover, setIsHover] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(0);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // image previous and next function
  const nextImage = () => {
    if (!project.images?.length) return;
    
    setDirection(1);

    setCurrentImage((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    if (!project.images?.length) return;

    setDirection(-1);

    setCurrentImage((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  // slide animation
  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 120 : -120,
      opacity: 0,
    }),

    center: {
      x: 0,
      opacity: 1,
    },

    exit: (direction) => ({
      x: direction > 0 ? -120 : 120,
      opacity: 0,
    }),
  };

  return (
    <motion.div
    initial={{ opacity: 0, x:-100}}
    whileInView={{ opacity: 1, x: 0}}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="flex justify-center gap-10 flex-col-reverse xl:flex-row py-10 z-90"
    >
      <div className="flex flex-1 flex-col">
        <p className="text-secondary">
          {project.technologies}
        </p>

        <p
        style={{ color: project.title_color }}
        className="text-3xl"
        >
          {project.title}
        </p>

        <p className="text-secondary">
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

      <div className="flex flex-1 justify-center xl:justify-end">
        <div className="aspect-4/3 relative"> 

          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={project.images[currentImage]?.id}
                custom={direction}
                src={project.images[currentImage]?.image_url}
                alt={project.title}
                onClick={() => setIsPreviewOpen(true)}
                className="w-xl object-cover"
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.1,
                  ease: "easeInOut",
                }}
              />
            </AnimatePresence>
          </div>

          {project.images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/10 hover:bg-black/60 text-white rounded-full w-7 h-7 md:w-10 md:h-10 transition flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/10 hover:bg-black/60 text-white rounded-full w-7 h-7 md:w-10 md:h-10 transition flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
              </button>

              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10 flex gap-2 px-3 py-1.5 rounded-full backdrop-blur-xs">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition ${
                      currentImage === index ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

        </div>
      </div>

      <ImagePreviewModal 
      isOpen={isPreviewOpen}
      images={project.images}
      currentImage={currentImage}
      onClose={() => setIsPreviewOpen(false)}
      />

    </motion.div>
  );
};

export default ProjectCard;