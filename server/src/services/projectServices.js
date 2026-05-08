const pool = require("../config/db");

// get all projects (handle SQL)
/*const getProjectsService = async () => {
  const result = await pool.query(`
    SELECT
      p.*,
      COALESCE(
        json_agg(pi.image_url)
        FILTER (WHERE pi.image_url IS NOT NULL),
        '[]'
      ) AS images
    FROM projects p
    LEFT JOIN project_images pi
      ON p.id = pi.project_id
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `);

  return result.rows;
};*/

// get all projects (handle SQL)
const getProjectsService = async () => {
  const result = await pool.query(`
    SELECT
      p.*,
      COALESCE(
        json_agg(
          json_build_object(
            'id', pi.id,
            'image_url', pi.image_url
          )
        )
        FILTER (WHERE pi.id IS NOT NULL),
        '[]'
      ) AS images
    FROM projects p
    LEFT JOIN project_images pi
      ON p.id = pi.project_id
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `);

  return result.rows;
};

// post project (handle SQL)
const postProjectService = async (projectData) => {
  const {
    title,
    description,
    technologies,
    live_link,
    is_featured,
    images, // project_images wrap into COALESCE
  } = projectData;

  // create to projects
  const projectResult = await pool.query(
    `
    INSERT INTO projects 
    (title, description, technologies, live_link, is_featured)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [
      title,
      description,
      technologies,
      live_link,
      is_featured,
    ]
  );

  const newProject = projectResult.rows[0];

  //  save multiple images to project_images
  if (images && images.length > 0) {
    for (const imageUrl of images) {
      await pool.query(
        `
        INSERT INTO project_images
        (project_id, image_url)
        VALUES ($1, $2)
        `,
        [newProject.id, imageUrl]
      );
    }
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
    images,
  } = projectData;

  // update to projects
  const result = await pool.query(
    `
    UPDATE projects
    SET
      title = $1,
      description = $2,
      technologies = $3,
      live_link = $4,
      is_featured = $5
    WHERE id = $6
    RETURNING *
    `,
    [
      title,
      description,
      technologies,
      live_link,
      is_featured,
      id,
    ]
  );

  const updatedProject = result.rows[0];

  // insert new images to project_images
  if (images && images.length > 0) {
    for (const imageUrl of images) {
      await pool.query(
        `
        INSERT INTO project_images
        (project_id, image_url)
        VALUES ($1, $2)
        `,
        [id, imageUrl]
      );
    }
  }

  return updatedProject;
};

// delete project images (handle SQL)
const deleteProjectImageService = async (imgId) => {
  const result = await pool.query(
    `
    DELETE FROM project_images
    WHERE id = $1
    RETURNING *
    `,
    [imgId]
  );

  return result.rows[0];
};

// delete project (handle SQL)
const deleteProjectService = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM projects
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Project not found");
  }

  return result.rows[0];
};

module.exports = {
  getProjectsService,
  postProjectService,
  updateProjectService,
  deleteProjectService,
  deleteProjectImageService,
};