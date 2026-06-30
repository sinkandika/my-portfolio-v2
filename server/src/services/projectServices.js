import supabase from "../config/db.js";

// get all projects (handle SQL)
const getProjectsService = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      project_images (
        id,
        image_url
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map(project => ({
    ...project,
    images: project.project_images,
  }));
};

// post project (handle SQL)
const postProjectService = async (projectData) => {
  const {
    title,
    description,
    technologies,
    live_link,
    is_featured,
    title_color,
    hover_color,
    images,
  } = projectData;

  // Create project
  const { data: newProject, error: projectError } = await supabase
    .from("projects")
    .insert({
      title,
      description,
      technologies,
      live_link,
      is_featured,
      title_color,
      hover_color,
    })
    .select()
    .single();

  if (projectError) throw projectError;

  // Save project images
  if (images && images.length > 0) {
    const imageRows = images.map((imageUrl) => ({
      project_id: newProject.id,
      image_url: imageUrl,
    }));

    const { error: imageError } = await supabase
      .from("project_images")
      .insert(imageRows);

    if (imageError) throw imageError;
  }

  return newProject;
};

// update/put project (handle SQL)
const updateProjectService = async (id, projectData) => {
  const {
    title,
    description,
    technologies,
    live_link,
    is_featured,
    title_color,
    hover_color,
    images,
  } = projectData;

  // Update project
  const { data: updatedProject, error: updateError } = await supabase
    .from("projects")
    .update({
      title,
      description,
      technologies,
      live_link,
      is_featured,
      title_color,
      hover_color,
    })
    .eq("id", id)
    .select()
    .single();

  if (updateError) throw updateError;

  // Insert newly added images
  if (images && images.length > 0) {
    const imageRows = images.map((imageUrl) => ({
      project_id: id,
      image_url: imageUrl,
    }));

    const { error: imageError } = await supabase
      .from("project_images")
      .insert(imageRows);

    if (imageError) throw imageError;
  }

  return updatedProject;
};

// delete project images (handle SQL)
const deleteProjectImageService = async (imgId) => {
  const { data, error } = await supabase
    .from("project_images")
    .delete()
    .eq("id", imgId)
    .select()
    .single();

  if (error) throw error;

  return data;
};

// delete project (handle SQL)
const deleteProjectService = async (id) => {
  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error || !data) {
    throw new Error("Project not found");
  }

  return data;
};

export {
  getProjectsService,
  postProjectService,
  updateProjectService,
  deleteProjectService,
  deleteProjectImageService,
};