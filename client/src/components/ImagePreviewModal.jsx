import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function ImagePreviewModal ({ 
  isOpen, 
  images, 
  currentImage, 
  onClose 
}) {

  const [previewImage, setPreviewImage] = useState(currentImage);

  const [direction, setDirection] = useState(0);

  // synchronize image and image preview
  useEffect (() => {
    if (!isOpen) {
      setPreviewImage(currentImage); // make preview image same with current image in ProjectCard
    }
  }, [isOpen, currentImage]);

  // stop scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen])

  // image previous and next function
  const nextImage = () => {
    setDirection(1)
    
    setPreviewImage((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setDirection(-1)

    setPreviewImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
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

  if (!isOpen) return null;

  return createPortal(
    <div
    onClick={onClose}
    className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-99"
    >

      {images.length > 1 ? (
        <div 
        onClick={(e) => e.stopPropagation()}
        className="flex flex-row justify-center items-center gap-x-2"
        >
          <button
            onClick={previousImage}
            className="bg-black/10 hover:bg-black/60 text-white rounded-full w-7 h-7 md:w-10 md:h-10 transition flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>

          <div className="flex">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={images[previewImage]?.id}
                custom={direction}
                src={images[previewImage]?.image_url}
                alt="Preview"
                className="max-w-full max-h-screen object-contain rounded-lg"
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

            <div className="relative">
              <button
              onClick={onClose}
              className="absolute right-1 top-2 text-secondary hover:text-black"
              >
                <X/>
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={nextImage}
              className="bg-black/10 hover:bg-black/60 text-white rounded-full w-7 h-7 md:w-10 md:h-10 transition flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          </div>

        </div>
      ) : (
        <div className="">
            <img 
            src={images[previewImage]?.image_url}
            alt="Preview"
            className="w-4xl max-h-screen object-contain rounded-lg"
            />
        </div>
      )}
    </div>,
    document.body
  );
};

export default ImagePreviewModal;