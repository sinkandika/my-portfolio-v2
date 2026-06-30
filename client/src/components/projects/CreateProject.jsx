import { useState } from "react";
import { uploadImages, } from "../../services/cloudinaryService";

function CreateProject({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [titleColor, setTitleColor] = useState("");
  const [hoverColor, setHoverColor] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let uploadedImageUrls = [];

      // Upload images only if there are any
      if (selectedFiles.length > 0) {
        uploadedImageUrls = await uploadImages(selectedFiles);
      }

      // Save project
      await onCreate({
        title,
        description,
        technologies,
        live_link: liveLink,
        is_featured: isFeatured,
        title_color: titleColor,
        hover_color: hoverColor,
        images: uploadedImageUrls,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setTechnologies("");
      setLiveLink("");
      setIsFeatured(false);
      setTitleColor("");
      setHoverColor("");
      setSelectedFiles([]);

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[500px]">
        <h2 className="text-2xl font-bold mb-4">
          Create Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="border p-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Technologies"
            className="border p-2 w-full"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
          />

          <input
            type="text"
            placeholder="Live Link"
            className="border p-2 w-full"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
          />
          <p>Recommend image: 1024 × 768 px </p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setSelectedFiles((prev) => [
                ...prev,
                ...Array.from(e.target.files),
              ])
            }
            className="border p-2 w-full"
          />
          {selectedFiles.length > 0 && (
            <div className="border rounded p-3">
              <p className="font-semibold mb-2">
                Selected Files:
              </p>

              <div className="space-y-1">
                {selectedFiles.map((file, index) => (
                  <p
                    key={index}
                    className="text-sm"
                  >
                    {index + 1}. {file.name}
                  </p>
                ))}
              </div>
            </div>
          )}

          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            Featured Project
          </label>

          <input
            type="text"
            placeholder="Title Color"
            className="border p-2 w-full"
            value={titleColor}
            onChange={(e) => setTitleColor(e.target.value)}
          />

          <input
            type="text"
            placeholder="Hover Color"
            className="border p-2 w-full"
            value={hoverColor}
            onChange={(e) => setHoverColor(e.target.value)}
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-4 py-2"
            >
              {loading ? "Uploading..." : "Create"}
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

export default CreateProject;