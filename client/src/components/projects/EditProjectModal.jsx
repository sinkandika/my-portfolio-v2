import { useEffect, useState } from "react";
import { uploadImagesToCloudinary } from "../../services/cloudinaryService";
import { deleteProjectImage } from "../../services/projectService";

function EditProjectModal({
  isOpen,
  onClose,
  onUpdate,
  project,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // show all images

  // load project
  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setTechnologies(project.technologies);
      setLiveLink(project.live_link);
      setIsFeatured(project.is_featured);
      setExistingImages(project.images || []);
    }
  }, [project]);

  if (!isOpen || !project) return null;

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let newImageUrls = [];

      if (selectedFiles.length > 0) {
        newImageUrls =
          await uploadImagesToCloudinary(selectedFiles);
      }

      await onUpdate(project.id, {
        title,
        description,
        technologies,
        live_link: liveLink,
        is_featured: isFeatured,
        images: newImageUrls,
      });

      onClose();
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  // delete image
  const handleDeleteImage = async (imageId) => {
    try {
      await deleteProjectImage(imageId);

      setExistingImages((prev) =>
        prev.filter((img) => img.id !== imageId)
      );
    } catch (err) {
      console.log(err);
      alert("Failed to delete image");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[500px]">
        <h2 className="text-2xl font-bold mb-4">
          Edit Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border p-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="border p-2 w-full"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
          />

          <input
            className="border p-2 w-full"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
          />

          <input
            type="file"
            multiple
            onChange={(e) =>
              setSelectedFiles((prev) => [
                ...prev,
                ...Array.from(e.target.files),
              ])
            }
          />

          {existingImages.map((img) => (
            <div key={img.id} className="flex items-center gap-2">
              <img
                src={img.image_url}
                className="w-20 h-20 object-cover"
              />
              <button
                type="button"
                onClick={() => handleDeleteImage(img.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}

          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            Featured
          </label>


          <div className="flex gap-3">
            <button className="bg-black text-white px-4 py-2">
              Update
            </button>

            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProjectModal;